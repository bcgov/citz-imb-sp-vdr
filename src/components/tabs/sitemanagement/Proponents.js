import React, { Component, Fragment } from "react";
import MaterialTable from "material-table";
import $ from "jquery";

import { forwardRef } from "react";
import Users from "./Users.js";

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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

const tableIcons = {
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

class Proponents extends Component {
  constructor(props) {
    super(props);

    const addProponent = (event, rowdata) => {
      console.debug("addProponent", event, rowdata);
      this.setState({ dialog: { open: true } });
    }

    this.handleClose = () => {
      console.debug("handleclose");
      this.setState({ dialog: { open: false } });
    }

    this.state = {
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
            console.debug("Add a Proponent", event, rowdata);
            addProponent(event, rowdata);
          }
        },
        {
          icon: tableIcons.NotInterested,
          tooltip: "Disable Proponent",
          onClick: (event, rowdata) => {
            console.debug("Disable Proponent", event, rowdata);
            alert("disable proponent");
          }
        },
        {
          icon: tableIcons.Add,
          tooltip: "Add user to  Proponent",
          onClick: (event, rowdata) => {
            console.debug("Add user to  Proponent", event, rowdata);
            alert("add a user to proponent");
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
      dialog: {
        open: false
      }
    };



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
    })
      .done(function (proponentResults) {


        $.ajax({
          url: "../_api/web/RoleAssignments?$expand=Member,Member/Users",
          type: "GET",
          async: false,
          headers: {
            Accept: "application/json;odata=verbose"
          }
        })
          .done(function (groupResult) {
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
              data: proponentResults.d.results
            })
          })
          .fail(function (err) {
            window.console &&
              console.warn(
                "Error is expected if page loaded outside of SharePoint",
                err
              );
          });
      })
      .fail(function (err) {
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
        <MaterialTable
          title="Proponents"
          options={{
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
          }}
          icons={tableIcons}
          data={this.state.data}
          actions={this.state.actions}
          columns={this.state.columns}
          detailPanel={rowData => {
            return (
              <Users group={this.state.data[rowData.tableData.id].Group} />
            );
          }}
        />
        <Dialog open={this.state.dialog.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add a new Proponent</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Proponent Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Proponents;
