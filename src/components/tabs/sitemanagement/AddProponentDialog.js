import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
import { CreateGroup } from 'citz-imb-sp-utilities'
import makeUUID from '../../utilities/makeUUID.js'

let SP = window.SP
let ExecuteOrDelayUntilScriptLoaded = window.ExecuteOrDelayUntilScriptLoaded
toast.configure({
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
})

export const AddProponentDialog = ({ open, listName, handleClose, saveCallback }) => {
    const [name, setName] = useState('')

    const handleSave = () => {
        // validate
        if (!name) return

        const newProponent = {
            Title: name,
            UUID: makeUUID()
        }

        CreateGroup({groupName:name})
        CreateList()
            //create proponent library
            .post(`${webFullUrl}/_api/web/lists`,
                {
                    "__metadata": { "type": "SP.List" },
                    "AllowContentTypes": true,
                    "BaseTemplate": 101,
                    "ContentTypesEnabled": true,
                    "Description": "Proponent Contribution Library.  created by automation",
                    "Title": newProponent.UUID
                },
                config
            ),
            CreateList()
            //create proponent question list
            .post(`${webFullUrl}/_api/web/lists`,
                {
                    "__metadata": { "type": "SP.List" },
                    "AllowContentTypes": true,
                    "BaseTemplate": 100,
                    "ContentTypesEnabled": true,
                    "Description": "Proponent Question List.  created by automation",
                    "Title": newProponent.UUID + "_Questions"
                },
                config
            ),
            //get site owner group
            GetAssociatedGroups()
            .get(`${webFullUrl}/_api/Web/AssociatedOwnerGroup`),
            .get(`${webFullUrl}/_api/Web/AssociatedMemberGroup`),
            .get(`${webFullUrl}/_api/Web/RoleDefinitions/getbyname('Full Control')`),
            .get(`${webFullUrl}/_api/Web/RoleDefinitions/getbyname('Contribute')`),
            .get(`${webFullUrl}/_api/Web/RoleDefinitions/getbyname('Read')`)
            ]).then(.spread((groupResponse, libraryResponse, listResponse, siteOwnerResponse, siteMemberResponse, fullControlResponse, contributeResponse, readResponse) => {
                newProponent.GroupId = groupResponse.data.Id
                    //TODO: update group owner
                    ChangeGroupOwner()
                    // ExecuteOrDelayUntilScriptLoaded(() => {
                    //     const clientContext = new SP.clientContext()
                    //     const ownerGroup = clientContext.get_web().get_siteGroups().getByName(siteOwnerResponse.data.Title)
                    //     const group = clientContext.get_web().get_siteGroups().getByName(groupResponse.data.Title)

                    //     group.set_owner(ownerGroup)
                    //     group.update()

                    //     clientContext.exectuteQueryAsync(() => {
                    //         console.log(`'${groupResponse.data.Title}' owner updated to '${siteOwnerResponse.data.Title}'`)
                    //     }, (sender, args) => {
                    //         console.log(`Failed ${args.get_message()}\n ${args.get_stackTrace()}`)
                    //     })
                    //     console.log("newProponent", newProponent)
                    //     console.log("this.state.config", this.state.config)
                    //     newProponent.__metadata = {
                    //         "type": "SP.Data.ListItem"
                    //     }
                    // }, 'sp.js')
                    .all([
                //add proponent to proponent list
                AddItemsToList()
                .post(`${webFullUrl}/_api/web/Lists/GetByTitle('Proponents')/items`,
                        {
                            "__metadata": {
                                "type": "SP.Data.ProponentsListItem"
                            },
                            "Title": newProponent.Title,
                            "UUID": newProponent.UUID,
                            "GroupId": newProponent.GroupId
                        },
                        {
                            headers: {
                                ...config.headers,
                                "Accept": "application/json:odata=verbose"
                            }
                        }
                    ),
                //set permissions site
                SetPermissionsOnSite()
                .post(`${webFullUrl}/_api/web/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${readResponse.data.Id})`,
                        {},
                        {
                            headers: {
                                ...config.headers,
                                "Accept": "application/json:odata=verbose"
                            }
                        }
                    ),
                //break permissions on library
                BreakInheritanceOnList()
                .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
                        {},
                        {
                            headers: {
                                ...config.headers,
                                "Accept": "application/json:odata=verbose"
                            }
                        }
                    ),
                //break permissions on list
                BreakInheritanceOnList()
                .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
                        {},
                        {}
                    )
                    ]).then(.spread((proponentResponse, webPermissionsResponse, libraryPermissionsResponse, listPermissionsResponse) => {
                        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
                            .all([
                    //set permissions on library
                    SetPermissionsOnSite()
                    .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
                                {},
                                {}),
                    .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                                    {},
                                    {}),
                    .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${contributeResponse.data.Id})`,
                                        {},
                                        {}),
                    //set permissions on list
                    SetPermissionsOnSite
                    .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
                                            {},
                                            {}),
                    .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                                                {},
                                                {}),
                    .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${contributeResponse.data.Id})`,
                                                    {},
                                                    {})
                            ]).then(.spread((libraryOwnerPermsResponse, libraryMembersPermsResponse, libraryProponentPermsResponse, listOwnerPermsResponse, listMembersPermsResponse, listProponentPermsResponse) => {
                                setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
                                    //remove current user perms on list
                                    RemovePermissionsOnList()
                                    .all([
                        .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${currentUser.Id},roledefid=${fullControlResponse.data.Id})`,
                                        {},
                                        {}
                                    ),
                        .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${currentUser.Id},roledefid=${fullControlResponse.data.Id})`,
                                        {},
                                        {}
                                    )
                                    ]).then(.spread((currentUserLibrary, currentUserList) => {
                                        setProgress(0)
                                        //update table
                                        props.close()
                                    }))
                            }))
                    }))
            }))
    }

    return (
        <Dialog open={open} onClose={props.close}>
            <DialogTitle id="form-dialog-title">Add a new Proponent</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="proponentName"
                    label="Proponent's Name"
                    type="text"
                    fullWidth
                    onChange={e => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Save
                      </Button>
                <Button onClick={props.close} color="primary">
                    Cancel
                      </Button>
            </DialogActions>
        </Dialog>
    )
}