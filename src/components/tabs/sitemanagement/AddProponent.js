import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
import makeUUID from '../../utilities/makeUUID.js'
import { PageContext } from '../../../App'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
/**
 * present add proponent dialog
 */

let SP = window.SP
let ExecuteOrDelayUntilScriptLoaded = window.ExecuteOrDelayUntilScriptLoaded

export default function AddProponent(props) {
    const pageContext = useContext(PageContext)

    const [progress, setProgress] = React.useState(0);
    const [name, setName] = useState('')

    const config = {
        headers: {
            "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
            "content-type": "application/json;odata=verbose"
        }
    }

    const handleSave = () => {
        // validate
        if (!name) return

        const newProponent = {
            Title: name,
            UUID: makeUUID()
        }
        setProgress(0)

        axios.all([
            //create proponent group
            axios.post(`${pageContext.webAbsoluteUrl}/_api/web/sitegroups`,
                {
                    "__metadata": { "type": "SP.Group" },
                    "Description": "Proponent Group.  created by automation",
                    "Title": newProponent.UUID
                },
                config
            ),
            //create proponent library
            axios.post(`${pageContext.webAbsoluteUrl}/_api/web/lists`,
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
            //create proponent question list
            axios.post(`${pageContext.webAbsoluteUrl}/_api/web/lists`,
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
            axios.get(`${pageContext.webAbsoluteUrl}/_api/Web/AssociatedOwnerGroup`),
            axios.get(`${pageContext.webAbsoluteUrl}/_api/Web/AssociatedMemberGroup`),
            axios.get(`${pageContext.webAbsoluteUrl}/_api/Web/RoleDefinitions/getbyname('Full Control')`),
            axios.get(`${pageContext.webAbsoluteUrl}/_api/Web/RoleDefinitions/getbyname('Contribute')`),
            axios.get(`${pageContext.webAbsoluteUrl}/_api/Web/RoleDefinitions/getbyname('Read')`)
        ]).then(axios.spread((groupResponse, libraryResponse, listResponse, siteOwnerResponse, siteMemberResponse, fullControlResponse, contributeResponse, readResponse) => {
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
            newProponent.GroupId = groupResponse.data.Id
            //TODO: update group owner
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
            axios.all([
                //add proponent to proponent list
                axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists/GetByTitle('Proponents')/items`,
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
                axios.post(`${pageContext.webAbsoluteUrl}/_api/web/RoleAssignments/addRoleAssignment(principalid=${groupResponse.data.Id},roledefid=${readResponse.data.Id})`,
                    {},
                    {
                        headers: {
                            ...config.headers,
                            "Accept": "application/json:odata=verbose"
                        }
                    }
                ),
                //break permissions on library
                axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${libraryResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
                    {},
                    {
                        headers: {
                            ...config.headers,
                            "Accept": "application/json:odata=verbose"
                        }
                    }
                ),
                //break permissions on list
                axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${listResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
                    {},
                    {}
                )
            ]).then(axios.spread((proponentResponse, webPermissionsResponse, libraryPermissionsResponse, listPermissionsResponse) => {
                setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
                axios.all([
                    //set permissions on library
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
                        {},
                        {}),
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                        {},
                        {}),
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${groupResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                        {},
                        {}),
                    //set permissions on list
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
                        {},
                        {}),
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                        {},
                        {}),
                    axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${groupResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
                        {},
                        {})
                ]).then(axios.spread((libraryOwnerPermsResponse, libraryMembersPermsResponse, libraryProponentPermsResponse, listOwnerPermsResponse, listMembersPermsResponse, listProponentPermsResponse) => {
                    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
                    //remove current user perms on list
                    axios.all([
                        axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${pageContext.userId},roledefid=${fullControlResponse.data.Id})`,
                            {},
                            {}
                        ),
                        axios.post(`${pageContext.webAbsoluteUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${pageContext.userId},roledefid=${fullControlResponse.data.Id})`,
                            {},
                            {}
                        )
                    ]).then(axios.spread((currentUserLibrary, currentUserList) => {
                        setProgress(0)
                        //update table
                        props.close()
                    }))
                }))
            }))
        }))
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
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