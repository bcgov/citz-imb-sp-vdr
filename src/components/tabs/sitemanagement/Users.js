import React, { Component, forwardRef } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton } from "@material-ui/core"
import MaterialTable from 'material-table'

import Add from '@material-ui/icons/Add'
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
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import CloseIcon from '@material-ui/icons/Close'
/**
 * Present the users for a specific proponent in a dialog
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
    NotInterested: forwardRef((props, ref) => <NotInterestedIcon {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export class Users extends Component {
    constructor(props) {
        super(props)
        const proponentName = props.proponentName

        this.state = {
            table: {
                title: 'User Accounts for ' + proponentName,
                options: {
                    search: false,
                    sorting: false,
                    paging: false,
                    pageSize: 20,
                    draggable: false,
                    toolbar: true
                },
                icons: tableIcons,
                data: [
                    {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(1234)",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(1234)",
                            "type": "SP.User"
                        },
                        "Groups": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(1234)/Groups"
                            }
                        },
                        "Id": 1234,
                        "IsHiddenInUI": false,
                        "LoginName": "i:0ǵ.t|bcgovidp|4e8c00fb6b984815b5d90ea554e8d8f9",
                        "Title": "adam spiteri",
                        "PrincipalType": 1,
                        "Email": "adam_spiteri@hotmail.ca",
                        "IsShareByEmailGuestUser": false,
                        "IsSiteAdmin": false,
                        "UserId": {
                            "__metadata": {
                                "type": "SP.UserIdInfo"
                            },
                            "NameId": "4e8c00fb6b984815b5d90ea554e8d8f9",
                            "NameIdIssuer": "TrustedProvider:bcgovidp"
                        }
                    },
                    {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(188)",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(188)",
                            "type": "SP.User"
                        },
                        "Groups": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(188)/Groups"
                            }
                        },
                        "Id": 188,
                        "IsHiddenInUI": false,
                        "LoginName": "i:0ǵ.t|bcgovidp|01cf69ab0f394f45ab8d094eb50d130f",
                        "Title": "Passmore, Shane CITZ:EX",
                        "PrincipalType": 1,
                        "Email": "Shane.Passmore@gov.bc.ca",
                        "IsShareByEmailGuestUser": false,
                        "IsSiteAdmin": false,
                        "UserId": {
                            "__metadata": {
                                "type": "SP.UserIdInfo"
                            },
                            "NameId": "01cf69ab0f394f45ab8d094eb50d130f",
                            "NameIdIssuer": "TrustedProvider:bcgovidp"
                        }
                    },
                    {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(5)",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(5)",
                            "type": "SP.User"
                        },
                        "Groups": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/_api/Web/GetUserById(5)/Groups"
                            }
                        },
                        "Id": 5,
                        "IsHiddenInUI": false,
                        "LoginName": "i:0ǵ.t|bcgovidp|fc9f8c4adca2445f80e247555906c873",
                        "Title": "Spiteri, Adam C CITZ:EX",
                        "PrincipalType": 1,
                        "Email": "Adam.Spiteri@gov.bc.ca",
                        "IsShareByEmailGuestUser": false,
                        "IsSiteAdmin": true,
                        "UserId": {
                            "__metadata": {
                                "type": "SP.UserIdInfo"
                            },
                            "NameId": "fc9f8c4adca2445f80e247555906c873",
                            "NameIdIssuer": "TrustedProvider:bcgovidp"
                        }
                    }
                ],
                actions: [
                    {
                        icon: tableIcons.Add,
                        tooltip: "Add a User",
                        isFreeAction: true,
                        onClick: (event, rowdata) => {
                            this.setState({
                                addUser: {
                                    open: true,
                                    handleClose: () => {
                                        this.setState({
                                            addUser: {
                                                open: false
                                            }
                                        })
                                    },
                                    handleSave: () => {
                                        alert("Save User")
                                        this.setState({
                                            addUser: {
                                                open: false
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    },
                    {
                        icon: tableIcons.NotInterested,
                        tooltip: "Remove User",
                        onClick: (event, rowdata) => {
                            this.setState({
                                removeUser: {
                                    open: true,
                                    userId: rowdata,
                                    handleClose: () => {
                                        this.setState({
                                            removeUser: {
                                                open: false
                                            }
                                        })
                                    },
                                    handleRemove: () => {
                                        alert("Remove User")
                                        this.setState({
                                            removeUser: {
                                                open: false
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                ],
                columns: [
                    {
                        title: "User",
                        field: "Title"
                    },
                    {
                        title: "Email",
                        field: "Email"
                    }
                ]
            }
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose} maxWidth='md'>
                <DialogTitle id="form-dialog-title">
                    User accounts for {this.props.proponentName}
                    <IconButton aria-label='close' onClick={this.props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <MaterialTable {...this.state.table} />
                </DialogContent>
            </Dialog>
        )
    }
}

export default Users
