import React, { Component, forwardRef, Fragment } from 'react'
import MaterialTable from 'material-table'
import Add from "@material-ui/icons/Add"
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core"

/**
 * presents the question submitted by the current proponent
 */
const tableIcons = {
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
    AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export class PrivateQuestions extends Component {
    constructor(props) {
        super(props)

        const askQuestion = (event, rowdata) => {
            console.debug("askQuestion", event, rowdata);
            this.setState({ dialog: { open: true } });
        }

        this.handleClose = () => {
            console.debug("handleclose");
            this.setState({ dialog: { open: false } });
        }

        this.state = {
            columns: [
                { title: "Question", field: "Question" }
            ],
            data: [
                {
                    Question: "What is going on?"
                }
            ],
            actions: [
                {
                    icon: tableIcons.Add,
                    tooltip: "Ask a Question",
                    isFreeAction: true,
                    onClick: (event, rowdata) => {
                        console.debug("Ask a Question", event, rowdata);
                        askQuestion(event, rowdata);
                    }
                }
            ],
            dialog: {
                open: false
            }
        }
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        search: false,
                        paging: false,
                        sorting: false,
                        draggable: false
                    }}
                    actions={this.state.actions}
                    columns={this.state.columns}
                    data={this.state.data}
                    title="My Submitted Questions"
                />
                <Dialog open={this.state.dialog.open} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Ask a Question</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="question"
                            label="type your question..."
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}