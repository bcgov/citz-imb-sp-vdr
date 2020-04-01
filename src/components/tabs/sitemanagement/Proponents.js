import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  forwardRef
} from "react";
import MaterialTable from "material-table";
import AddProponent from "./AddProponent.js";
import DisableProponent from "./DisableProponent.js";
import ProponentLibrary from "./ProponentLibrary.js";
import ProponentQuestions from "./ProponentQuestions.js";

import axios from "axios";
import { WebFullUrl } from "../../../App";

import Add from "@material-ui/icons/Add";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PeopleIcon from "@material-ui/icons/People";
import Users from "./Users.js";

/**
 * present the proponents
 */

const tableIcons = {
  People: forwardRef((props, ref) => <PeopleIcon {...props} ref={ref} />),
  Question: forwardRef((props, ref) => (
    <QuestionAnswerIcon {...props} ref={ref} />
  )),
  Library: forwardRef((props, ref) => (
    <LibraryBooksIcon {...props} ref={ref} />
  )),
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  NotInterested: forwardRef((props, ref) => (
    <NotInterestedIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function Proponents() {
  const webFullUrl = useContext(WebFullUrl);

  const [currentProponent, setCurrentProponent] = useState("");
  const [currentProponentName, setCurrentProponentName] = useState("");
  const [proponentAddDialog, setProponentAddDialog] = useState(false);
  const [proponentLibraryDialog, setProponentLibraryDialog] = useState(false);
  const [proponentQuestionDialog, setProponentQuestionDialog] = useState(false);
  const [proponentDisableDialog, setProponentDisableDialog] = useState(false);
  const [users, setUsers] = useState({ open: false });
  const [table, setTable] = useState({
    title: "Proponents",
    key: Math.random(),
    options: {
      search: false,
      sorting: false,
      paging: false,
      pageSize: 20,
      draggable: false
    },
    icons: tableIcons,
    data: [],
    actions: [
      {
        //add a proponent
        icon: tableIcons.Add,
        tooltip: "Add a Proponent",
        isFreeAction: true,
        onClick: (event, rowdata) => {
          setProponentAddDialog(true);
        }
      },
      {
        //disable a proponent
        icon: tableIcons.NotInterested,
        tooltip: "Disable Proponent",
        onClick: (event, rowdata) => {
          setCurrentProponentName(rowdata.Title);
          setCurrentProponent(rowdata.UUID);
          setProponentDisableDialog(true);
        }
      },
      {
        //manage proponent users
        icon: tableIcons.People,
        tooltip: "Manage User Accounts",
        onClick: (event, rowdata) => {
          setUsers({
            open: true,
            group: rowdata.GroupId,
            proponentName: rowdata.Title,
            handleClose: usersHandleClose
          });
        }
      },
      {
        //manage proponent library
        icon: tableIcons.Library,
        tooltip: "Open Proponent Library",
        onClick: (event, rowdata) => {
          setCurrentProponent(rowdata.UUID);
          setProponentLibraryDialog(true);
        }
      },
      {
        //manage proponent questions
        icon: tableIcons.Question,
        tooltip: "Open Proponent Questions",
        onClick: (event, rowdata) => {
          setCurrentProponent(rowdata.UUID);
          setProponentQuestionDialog(true);
        }
      }
    ],
    columns: [
      {
        title: "Proponent",
        field: "Title"
      },
      {
        title: "Unique ID",
        field: "UUID"
      }
    ]
  });

  const addProponentHandleClose = () => {
    setProponentAddDialog(false);
    refreshTableData();
  };

  const proponentLibraryHandleClose = () => {
    setProponentLibraryDialog(false);
  };

  const proponentQuestionHandleClose = () => {
    setProponentQuestionDialog(false);
  };

  const proponentDisableHandleClose = () => {
    setProponentDisableDialog(false);
  };

  const usersHandleClose = () => {
    setUsers({
      open: false,
      group: 0,
      proponentName: ""
    });
  };

  const refreshTableData = () => {
    axios
      .get(
        `${webFullUrl}/_api/web/lists/getByTitle('Proponents')/items`
      )
      .then(proponentResponse => {
        axios
          .get(
            `${webFullUrl}/_api/web/RoleAssignments?$expand=Member,Member/Users`
          )
          .then(roleAssignmentsResponse => {
            for (
              let i = 0;
              i < roleAssignmentsResponse.data.value.length;
              i++
            ) {
              for (let j = 0; j < proponentResponse.data.value.length; j++) {
                if (
                  proponentResponse.data.value[j].GroupId ===
                  roleAssignmentsResponse.data.value[i].Member.Id
                ) {
                  proponentResponse.data.value[j].Group =
                    roleAssignmentsResponse.data.value[i];
                }
              }
            }
            setTable({
              ...table,
              data: proponentResponse.data.value
            });
          });
      });
  };

  useEffect(() => {
    refreshTableData();

    return () => { };
  }, []);

  return (
    <Fragment>
      <MaterialTable {...table} />
      <AddProponent open={proponentAddDialog} close={addProponentHandleClose} />
      <DisableProponent
        open={proponentDisableDialog}
        close={proponentDisableHandleClose}
        proponent={currentProponent}
        proponentName={currentProponentName}
      />
      <ProponentLibrary
        open={proponentLibraryDialog}
        close={proponentLibraryHandleClose}
        proponent={currentProponent}
      />
      <ProponentQuestions
        open={proponentQuestionDialog}
        close={proponentQuestionHandleClose}
        proponent={currentProponent}
      />
      <Users {...users} />
    </Fragment>
  );
}
