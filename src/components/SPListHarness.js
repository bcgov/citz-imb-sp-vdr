import React, { forwardRef } from "react";
import SPList from "./SPList";
import { MdRefresh } from "react-icons/md";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <MdRefresh {...props} ref={ref} />)
};

export default function SPListHarness() {
  const listProps = {
    icons: tableIcons,
    actions: [
      {
        icon: tableIcons.Edit,
        tooltip: "Edit item",
        onClick: (event, rowData) => {
          console.log("edit Click", event, rowData);
        }
      },
      {
        disabled: false,
        hidden: false,
        icon: tableIcons.Refresh,
        isFreeAction: true,
        onClick: (event, rowData) => {
          console.log("refresh", event, rowData);
        },
        tooltip: "Refresh table"
      }
    ],
    columns: [
      {
        field: "Title",
        title: "Title"
      },
      {
        field: "Created",
        title: "Created"
      }
    ],
    baseUrl: "http://localhost:8080/scott",
    listName: "CustomList"
  };

  return <SPList {...listProps} />;
}
