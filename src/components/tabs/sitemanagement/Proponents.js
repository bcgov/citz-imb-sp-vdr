import React, { Component, Fragment, forwardRef } from "react"
import MaterialTable from "material-table"
import $ from "jquery"
import AddProponent from "./AddProponent.js"
import DisableProponent from "./DisableProponent.js"
import ProponentLibrary from "./ProponentLibrary.js"
import ProponentQuestions from "./ProponentQuestions.js"
import Users from "./Users.js"

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

/**
 * present the proponents
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

class Proponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: {
        title: "Proponents",
        options: {
          search: false,
          sorting: false,
          paging: false,
          pageSize: 20,
          draggable: false,
          rowStyle: rowData => ({
            backgroundColor:
              this.state.selectedRow &&
                this.state.selectedRow.tableData.id === rowData.tableData.id
                ? "#EEE"
                : "#FFF"
          })
        },
        icons: tableIcons,
        data: [
          {
            __metadata: {
              id: "d8cbaf56-dc56-4c13-9858-f45f75431cdc",
              uri:
                "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)",
              etag: '"1"',
              type: "SP.Data.ProponentsListItem"
            },
            FirstUniqueAncestorSecurableObject: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FirstUniqueAncestorSecurableObject"
              }
            },
            RoleAssignments: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/RoleAssignments"
              }
            },
            AttachmentFiles: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/AttachmentFiles"
              }
            },
            ContentType: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/ContentType"
              }
            },
            GetDlpPolicyTip: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/GetDlpPolicyTip"
              }
            },
            FieldValuesAsHtml: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesAsHtml"
              }
            },
            FieldValuesAsText: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesAsText"
              }
            },
            FieldValuesForEdit: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/FieldValuesForEdit"
              }
            },
            File: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/File"
              }
            },
            Folder: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/Folder"
              }
            },
            ParentList: {
              __deferred: {
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/Lists(guid'dd35b6a7-6830-4ee5-9ab6-b0e7deea57a4')/Items(1)/ParentList"
              }
            },
            FileSystemObjectType: 0,
            Id: 1,
            ID: 1,
            ContentTypeId: "0x010018263DB17EF71245A6CAB2C9ABA9F3B0",
            Title: "Proponent A",
            Modified: "2020-01-17T21:24:18Z",
            Created: "2020-01-17T21:24:18Z",
            AuthorId: 6,
            EditorId: 6,
            OData__UIVersionString: "1.0",
            Attachments: false,
            GUID: "320704cf-5ad7-473e-875e-259c8a947edf",
            UUID: "V123456",
            Active: true,
            GroupId: 242,
            Group: {
              __metadata: {
                id:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)",
                uri:
                  "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)",
                type: "SP.RoleAssignment"
              },
              Member: {
                __metadata: {
                  id:
                    "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member",
                  uri:
                    "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member",
                  type: "SP.Group"
                },
                Owner: {
                  __deferred: {
                    uri:
                      "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/Member/Owner"
                  }
                },
                Users: {
                  results: [
                    {
                      __metadata: {
                        id:
                          "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)",
                        uri:
                          "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)",
                        type: "SP.User"
                      },
                      Groups: {
                        __deferred: {
                          uri:
                            "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/GetUserById(6)/Groups"
                        }
                      },
                      Id: 6,
                      IsHiddenInUI: false,
                      LoginName:
                        "i:0ǵ.t|bcgovidp|a32d6f859c66450ca4995b0b2bf0a844",
                      Title: "Toews, Scott D CITZ:EX",
                      PrincipalType: 1,
                      Email: "Scott.Toews@gov.bc.ca",
                      IsShareByEmailGuestUser: false,
                      IsSiteAdmin: true,
                      UserId: {
                        __metadata: {
                          type: "SP.UserIdInfo"
                        },
                        NameId: "a32d6f859c66450ca4995b0b2bf0a844",
                        NameIdIssuer: "TrustedProvider:bcgovidp"
                      }
                    }
                  ]
                },
                Id: 242,
                IsHiddenInUI: false,
                LoginName: "VICO Template Owners",
                Title: "VICO Template Owners",
                PrincipalType: 8,
                AllowMembersEditMembership: false,
                AllowRequestToJoinLeave: false,
                AutoAcceptRequestToJoinLeave: false,
                Description:
                  "Use this group to grant people full control permissions to the SharePoint site: VICO Template",
                OnlyAllowMembersViewMembership: false,
                OwnerTitle: "VICO Template Owners",
                RequestToJoinLeaveEmailSetting: null
              },
              RoleDefinitionBindings: {
                __deferred: {
                  uri:
                    "https://citz.sp.gov.bc.ca/sites/DEV/VDRoom/_api/Web/RoleAssignments/GetByPrincipalId(242)/RoleDefinitionBindings"
                }
              },
              PrincipalId: 242
            }
          }
        ],
        actions: [
          {
            icon: tableIcons.Add,
            tooltip: "Add a Proponent",
            isFreeAction: true,
            onClick: (event, rowdata) => {
              this.setState({
                addProponent: {
                  open: true,
                  handleClose: () => {
                    this.setState({
                      addProponent: {
                        open: false
                      }
                    })
                  },
                  handleSave: () => (name) => {
                    console.log("Save Proponent", name)
                    this.setState({
                      addProponent: {
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
            tooltip: "Disable Proponent",
            onClick: (event, rowdata) => {
              this.setState({
                disableProponent: {
                  open: true,
                  proponentName: rowdata.Title,
                  handleClose: () => {
                    this.setState({
                      disableProponent: {
                        open: false
                      }
                    })
                  },
                  handleDisable: () => {
                    alert("Disable Proponent")
                    this.setState({
                      disableProponent: {
                        open: false
                      }
                    })
                  }
                }
              })
            }
          },
          {
            icon: tableIcons.People,
            tooltip: "Manage User Accounts",
            onClick: (event, rowdata) => {
              this.setState({
                users: {
                  open: true,
                  proponentName: rowdata.Title,
                  proponentGroup: rowdata.GroupId,
                  handleClose: () => {
                    this.setState({
                      users: {
                        open: false
                      }
                    })
                  }
                }
              })
            }
          },
          {
            icon: tableIcons.Library,
            tooltip: "Open Proponent Library",
            onClick: (event, rowdata) => {
              console.debug("Open Proponent Library", event, rowdata);
              alert("Open Proponent Library");
            }
          },
          {
            icon: tableIcons.Question,
            tooltip: "Open Proponent Questions",
            onClick: (event, rowdata) => {
              console.debug("Open Proponent Questions", event, rowdata);
              alert("Open Proponent Questions");
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
      },
      addProponent: {
        open: false
      },
      disableProponent: {
        open: false
      },
      users: {
        open: false
      }
    }
  }

  handleAddProponent = (name) => {
    
  }
  componentDidMount() {
    //get proponent list data
    let _this = this;

    $.ajax({
      url: "../_api/web/lists/getByTitle('Proponents')/items",
      type: "GET",
      async: false,
      headers: {
        Accept: "application/json;odata=verbose"
      }
    }).done(function (proponentResults) {
      $.ajax({
        url: "../_api/web/RoleAssignments?$expand=Member,Member/Users",
        type: "GET",
        async: false,
        headers: {
          Accept: "application/json;odata=verbose"
        }
      }).done(function (groupResult) {
        for (let i = 0; i < groupResult.d.results.length; i++) {
          for (let j = 0; j < proponentResults.d.results.length; j++) {
            if (
              proponentResults.d.results[j].GroupId ===
              groupResult.d.results[i].Member.Id
            ) {
              proponentResults.d.results[j].Group = groupResult.d.results[i];
            }
          }
        }
        _this.setState({
          table: { data: proponentResults.d.results }
        })
      }).fail(function (err) {
        window.console &&
          console.warn(
            "Error is expected if page loaded outside of SharePoint",
            err
          );
      });
    }).fail(function (err) {
      window.console &&
        console.warn(
          "Error is expected if page loaded outside of SharePoint",
          err
        );
    });
  }

  render() {
    return (
      <Fragment>
        <MaterialTable {...this.state.table} />
        <AddProponent {...this.state.addProponent} />
        <DisableProponent {...this.state.disableProponent} />
        <Users {...this.state.users} />
      </Fragment>
    )
  }
}

export default Proponents
