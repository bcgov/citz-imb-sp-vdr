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

class Proponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    "__metadata": {
                        "id": "d8cbaf56-dc56-4c13-9858-f45f75431cdc",
                        "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)",
                        "etag": "\"1\"",
                        "type": "SP.Data.ProponentsListItem"
                    },
                    "FirstUniqueAncestorSecurableObject": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FirstUniqueAncestorSecurableObject"
                        }
                    },
                    "RoleAssignments": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/RoleAssignments"
                        }
                    },
                    "AttachmentFiles": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/AttachmentFiles"
                        }
                    },
                    "ContentType": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/ContentType"
                        }
                    },
                    "GetDlpPolicyTip": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/GetDlpPolicyTip"
                        }
                    },
                    "FieldValuesAsHtml": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesAsHtml"
                        }
                    },
                    "FieldValuesAsText": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesAsText"
                        }
                    },
                    "FieldValuesForEdit": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesForEdit"
                        }
                    },
                    "File": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/File"
                        }
                    },
                    "Folder": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/Folder"
                        }
                    },
                    "ParentList": {
                        "__deferred": {
                            "uri": "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/ParentList"
                        }
                    },
                    "FileSystemObjectType": 0,
                    "Id": 1,
                    "ID": 1,
                    "ContentTypeId": "0x010018263DB17EF71245A6CAB2C9ABA9F3B0",
                    "Title": "Proponent A",
                    "Modified": "2020-01-17T21:24:18Z",
                    "Created": "2020-01-17T21:24:18Z",
                    "AuthorId": 6,
                    "EditorId": 6,
                    "OData__UIVersionString": "1.0",
                    "Attachments": false,
                    "GUID": "320704cf-5ad7-473e-875e-259c8a947edf",
                    "UUID": "V123456",
                    "Active": true,
                    "GroupId": 0
                }
            ],
            actions: [
                {
                    icon: tableIcons.Add,
                    tooltip: 'Add a Proponent',
                    isFreeAction: true,
                    onClick: (event, rowdata) => {
                        console.log(event, rowdata)
                        alert("add a proponent");
                    }
                },
                {
                    icon: tableIcons.NotInterested,
                    tooltip: 'Disable Proponent',
                    onClick: (event, rowdata) => {
                        console.log(event, rowdata)
                        alert("disable proponent");
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
            ],
            detailPanel: []
               
        }
        //get proponent list data
        let _this = this;

        $.ajax({
            url: "../_api/web/lists/getByTitle('Proponents')/items",
            type: "GET",
            async: false,
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        }).done(function (result) {
            _this.state.data = result.d.results
        }).fail(function (err) {
            window.console && console.log("failure is expected outside of SharePoint", err)
        })
    }

    componentDidMount() {
        //TODO: proper deactivation functionalitiy 
        $(".proponentDeactivate").click(function () {
            const table = $(this).closest('table').DataTable()

            alert('I am the Proponent handler')
        })
    }

    render() {
        return (
                <MaterialTable
                    title='Proponents'
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

export default Proponents