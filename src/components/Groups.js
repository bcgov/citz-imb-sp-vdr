import React, { Component } from 'react'
import MaterialTable from 'material-table'
import $ from 'jquery'

import { forwardRef } from 'react';

import Add from '@material-ui/icons/Add';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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


class Groups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    "__metadata": {
                        "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)",
                        "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)",
                        "type": "SP.RoleAssignment"
                    },
                    "Member": {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member",
                            "type": "SP.Group"
                        },
                        "Owner": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member/Owner"
                            }
                        },
                        "Users": {
                            "results": [
                                {
                                    "__metadata": {
                                        "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)",
                                        "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)",
                                        "type": "SP.User"
                                    },
                                    "Groups": {
                                        "__deferred": {
                                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)/Groups"
                                        }
                                    },
                                    "Id": 6,
                                    "IsHiddenInUI": false,
                                    "LoginName": "i:0ǵ.t|bcgovidp|a32d6f859c66450ca4995b0b2bf0a844",
                                    "Title": "Toews, Scott D CITZ:EX",
                                    "PrincipalType": 1,
                                    "Email": "Scott.Toews@gov.bc.ca",
                                    "IsShareByEmailGuestUser": false,
                                    "IsSiteAdmin": true,
                                    "UserId": {
                                        "__metadata": {
                                            "type": "SP.UserIdInfo"
                                        },
                                        "NameId": "a32d6f859c66450ca4995b0b2bf0a844",
                                        "NameIdIssuer": "TrustedProvider:bcgovidp"
                                    }
                                }
                            ]
                        },
                        "Id": 242,
                        "IsHiddenInUI": false,
                        "LoginName": "VICO Template Owners",
                        "Title": "VICO Template Owners",
                        "PrincipalType": 8,
                        "AllowMembersEditMembership": false,
                        "AllowRequestToJoinLeave": false,
                        "AutoAcceptRequestToJoinLeave": false,
                        "Description": "Use this group to grant people full control permissions to the SharePoint site: VICO Template",
                        "OnlyAllowMembersViewMembership": false,
                        "OwnerTitle": "VICO Template Owners",
                        "RequestToJoinLeaveEmailSetting": null
                    },
                    "RoleDefinitionBindings": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/RoleDefinitionBindings"
                        }
                    },
                    "PrincipalId": 242
                },
                {
                    "__metadata": {
                        "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)",
                        "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)",
                        "type": "SP.RoleAssignment"
                    },
                    "Member": {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)/Member",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)/Member",
                            "type": "SP.Group"
                        },
                        "Owner": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)/Member/Owner"
                            }
                        },
                        "Users": {
                            "results": []
                        },
                        "Id": 243,
                        "IsHiddenInUI": false,
                        "LoginName": "VICO Template Members",
                        "Title": "VICO Template Members",
                        "PrincipalType": 8,
                        "AllowMembersEditMembership": true,
                        "AllowRequestToJoinLeave": false,
                        "AutoAcceptRequestToJoinLeave": false,
                        "Description": "Use this group to grant people contribute permissions to the SharePoint site: VICO Template",
                        "OnlyAllowMembersViewMembership": false,
                        "OwnerTitle": "VICO Template Owners",
                        "RequestToJoinLeaveEmailSetting": null
                    },
                    "RoleDefinitionBindings": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(243)/RoleDefinitionBindings"
                        }
                    },
                    "PrincipalId": 243
                },
                {
                    "__metadata": {
                        "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)",
                        "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)",
                        "type": "SP.RoleAssignment"
                    },
                    "Member": {
                        "__metadata": {
                            "id": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)/Member",
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)/Member",
                            "type": "SP.Group"
                        },
                        "Owner": {
                            "__deferred": {
                                "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)/Member/Owner"
                            }
                        },
                        "Users": {
                            "results": []
                        },
                        "Id": 244,
                        "IsHiddenInUI": false,
                        "LoginName": "VICO Template Visitors",
                        "Title": "VICO Template Visitors",
                        "PrincipalType": 8,
                        "AllowMembersEditMembership": false,
                        "AllowRequestToJoinLeave": false,
                        "AutoAcceptRequestToJoinLeave": false,
                        "Description": "Use this group to grant people read permissions to the SharePoint site: VICO Template",
                        "OnlyAllowMembersViewMembership": false,
                        "OwnerTitle": "VICO Template Owners",
                        "RequestToJoinLeaveEmailSetting": null
                    },
                    "RoleDefinitionBindings": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(244)/RoleDefinitionBindings"
                        }
                    },
                    "PrincipalId": 244
                }
            ],
            actions: [],
            columns: [
                {
                    title: "Group",
                    field: 'Member.Title'
                }
            ]
        }

        //get site groups
        let _this = this;

        $.ajax({
            url: "../_api/web/RoleAssignments?$expand=Member,Member/Users",
            type: "GET",
            async: false,
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        }).done(function (result) {
            _this.state.data = result.d.results
        }).fail(function (err) {
            window.console && console.warn("Error is expected id page loaded outside of SharePoint", err)
        })
    }

    componentDidMount() {
        //TODO: proper deactivation functionalitiy 
        $(".manageGroup").click(function () {
            alert('I am the Group handler')
        })
    }

    render() {
        return (
            <MaterialTable  
            title='Groups'
            options={{
                search: false,
                sorting: false,
                paging: false,
                pageSize: 20,
                draggable: false
            }}
            icons={tableIcons}
            data={this.state.data}
            actions={this.state.actions}
            columns={this.state.columns}
        ></MaterialTable>
        )
    }
}

export default Groups