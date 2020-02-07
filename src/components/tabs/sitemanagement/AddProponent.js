import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
import makeUUID from '../../utilities/makeUUID.js'
import axios from 'axios'

/**
 * present add proponent dialog
 */


export class AddProponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: {
                    "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                    "content-type": "application/json;odata=verbose"
                }
            }
        }
    }

    handleSave = (name) => {
        const newProponent = {
            Title: "Proponent A",
            Modified: "2020-01-17T21:24:18Z",
            UUID: "",
            Active: true,
            GroupId: 0
        }

        // validate
        if (!name) return

        newProponent.Title = name

        // generate unique id
        newProponent.UUID = makeUUID()

        axios.all([
            //create proponent group
            axios.post(
                "../_api/web/sitegroups",
                {
                    "__metadata": { "type": "SP.Group" },
                    "Description": "Proponent Group.  created by automation",
                    "Title": newProponent.UUID
                },
                this.state.config
            ),
            //create proponent library
            axios.post(
                '../_api/web/lists',
                {
                    "__metadata": { "type": "SP.List" },
                    "AllowContentTypes": true,
                    "BaseTemplate": 101,
                    "ContentTypesEnabled": true,
                    "Description": "Proponent Contribution Library.  created by automation",
                    "Title": newProponent.UUID
                },
                this.state.config
            ),
            //create proponent question list
            axios.post(
                '../_api/web/lists',
                {
                    "__metadata": { "type": "SP.List" },
                    "AllowContentTypes": true,
                    "BaseTemplate": 100,
                    "ContentTypesEnabled": true,
                    "Description": "Proponent Question List.  created by automation",
                    "Title": newProponent.UUID + "_Questions"
                },
                this.state.config
            ),
            //get site owner group
            axios.get('../_api/Web/AssociatedOwnerGroup')
        ])
            .then(axios.spread((groupResponse, libraryResponse, listResponse, siteOwnerResponse) => {
                // console.log('all done')
                // console.log("groupResponse", groupResponse)
                // console.log("libraryResponse", libraryResponse)
                // console.log("listResponse", listResponse)
                // console.log("siteOwnerResponse", siteOwnerResponse)

                //TODO: update group owner
                // const clientContext = new SP.clientContext()
                // const ownerGroup = clientContext.get_web().get_siteGroups().getByName(siteOwnerResponse.data.Title)
                // const group = clientContext.get_web().get_siteGroups().getByName(groupResponse.data.Title)

                // group.set_owner(ownerGroup)
                // group.update()

                // clientContext.exectuteQueryAsync(() => {
                //     console.log(`'${groupResponse.data.Title}' owner updated to '${siteOwnerResponse.data.Title}'`)
                // }, (sender, args) => {
                //     console.log(`Failed ${args.get_message()}\n ${args.get_stackTrace()}`)
                // })
                console.log("newProponent", newProponent)
                console.log("this.state.config", this.state.config)
                newProponent.__metadata = {
                    "type": "SP.Data.ListItem"
                }
                axios.all([
                    //TODO: add proponent to proponent list
                    axios
                        .post(
                            "../_api/web/Lists/GetByTitle('Proponents')/items",
                            {
                                "__metadata": {
                                    "type": "SP.Data.ListItem"
                                },
                                "Title": "Fred",
                                "UUID": "V00000"
                            },
                            {
                                ...this.state.config.headers,
                                "Accept": "application/json:odata=verbose"
                            }

                        )
                        .then(response => {
                            console.log("add Item:", response)
                        })
                        .catch(error => {
                            if (error.response) {
                                // The request was made and the server responded with a status code
                                // that falls out of the range of 2xx
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                // The request was made but no response was received
                                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                // http.ClientRequest in node.js
                                console.log(error.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config)
                        })
                    //TODO: set permissions on library
                    //TODO: set permissions on list
                ])
                    .then(axios.spread(() => {
                        //update table
                        this.props.newProponent(newProponent)
                    }))
                    .catch(error => {
                        console.log("error", error)
                    })
            }))
            .catch(error => {
                console.log("error", error)
            })
    }

    handleClose = () => {
        this.props.close()
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle id="form-dialog-title">Add a new Proponent</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="proponentName"
                        label="Proponent's Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleSave(document.getElementById("proponentName").value)} color="primary">
                        Save
                      </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddProponent