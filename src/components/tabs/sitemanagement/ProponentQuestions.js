import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
import MaterialTable from "material-table"
import Add from "@material-ui/icons/Add"
import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import NotInterestedIcon from "@material-ui/icons/NotInterested"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PeopleIcon from '@material-ui/icons/People'
import axios from 'axios'
import { PageContext } from '../../../App'
import Moment from 'react-moment'
/**
 * present the proponents library
 */

const tableIcons = {
    People: forwardRef((props, ref) => <PeopleIcon {...props} ref={ref} />),
    Question: forwardRef((props, ref) => <QuestionAnswerIcon {...props} ref={ref} />),
    Library: forwardRef((props, ref) => <LibraryBooksIcon {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
    AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (<ChevronRight {...props} ref={ref} />)),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    NotInterested: forwardRef((props, ref) => (<NotInterestedIcon {...props} ref={ref} />)),
    PreviousPage: forwardRef((props, ref) => (<ChevronLeft {...props} ref={ref} />)),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

export default function ProponentQuestions(props) {
    const pageContext = useContext(PageContext)
    const [table, setTable] = useState({
        title: `${props.proponent} Submitted Questions`,
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
        actions: [],
        columns: [
            {
                title: "Question",
                field: "Title"
            },
            {
                title: "Created",
                field: "Created",
                render: rowData => <Moment fromNow>{rowData.Created}</Moment>
            }
        ]
    })

    useEffect(() => {
        axios.get(`${pageContext.webAbsoluteUrl}/_api/web/Lists/getByTitle('${props.proponent}_Questions')/items`)
            .then(response => {
                setTable({ ...table, data: response.data.value })
            })
        return () => {
            setTable({ ...table, data: [] })
        };
    }, [props.proponent])

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogContent>
                <MaterialTable {...table} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="primary">
                    Close
              </Button>
            </DialogActions>
        </Dialog>
    )
}