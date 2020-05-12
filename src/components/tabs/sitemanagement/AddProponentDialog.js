import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core'
import {
	CreateGroup,
	GetRoleDefinitions,
	AddPermissionsToList,
	CreateList,
	BreakListPermissionsInheritance,
	AddPermissionsToSite,
	GetAssociatedGroups,
	ChangeGroupOwner,
	AddItemsToList,
} from 'citz-imb-sp-utilities'
import makeUUID from '../../utilities/makeUUID.js'

// let SP = window.SP
// let ExecuteOrDelayUntilScriptLoaded = window.ExecuteOrDelayUntilScriptLoaded
// toast.configure({
//     position: "bottom-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: false
// })

export const AddProponentDialog = ({
	open,
	listName,
	handleClose,
	saveCallback,
}) => {
	const [name, setName] = useState('')
	const uniqueId = makeUUID()

	const handleSave = () => {
		// validate
		if (!name) return

		Promise.all([
			CreateGroup({ groupName: uniqueId }),
			CreateList({ listName: uniqueId, BaseTemplate: 101 }), //create proponent library
			CreateList({ listName: `${uniqueId}_Questions` }), //create proponent question list
			GetAssociatedGroups(),
			GetRoleDefinitions({}),
		]).then((response1) => {
			let [group, library, list, assocGroups, roles] = response1
			Promise.all([
				ChangeGroupOwner({
					groupId: group.Id,
					ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
				}), //proponent group - need results of CreateGroup and GetAssociatedGroups
				// AddItemsToList({
				// 	listName: 'Proponents',
				// 	items: {
				// 		Title: name,
				// 		UUID: uniqueId,
				// 		GroupId: group.Id,
				// 	},
				// }), //add to proponents list - need results of CreateGroup
				// AddPermissionsToSite({
				// 	principalId: group.Id,
				// 	roleDefId: roles['Read'].Id,
				// }), //add proponent group to see site - need results of CreateGroup
				// BreakListPermissionsInheritance({ listGUID: library.Id }), //proponent library - need results of CreateList
				// BreakListPermissionsInheritance({ listGUID: list.Id }), //proponent question list - need results of CreateList
			]).then((response2) => {
				// AddPermissionsToList({
				// 	listGUID: library.Id,
				// 	principalId: group.Id,
				// 	roleDefId,
				// }), //proponent library - need results of CreateList and CreateGroup
				//AddPermissionsToList({
				// 	listGUID: library.Id,
				// 	principalId: group.Id,
				// 	roleDefId,
				// }), //proponent question list - need results of CreateList and CreateGroup
				handleClose()
			})
		})

		//
		//             AddItemsToList()
		//             .post(`${webFullUrl}/_api/web/Lists/GetByTitle('Proponents')/items`,
		//                     {
		//                         "__metadata": {
		//                             "type": "SP.Data.ProponentsListItem"
		//                         },
		//                         "Title": newProponent.Title,
		//                         "UUID": newProponent.UUID,
		//                         "GroupId": newProponent.GroupId
		//                     },
		//                     {
		//                         headers: {
		//                             ...config.headers,
		//                             "Accept": "application/json:odata=verbose"
		//                         }
		//                     }
		//                 ),
		//             //set permissions site
		//             SetPermissionsOnSite()
		//             .post(`${webFullUrl}/_api/web/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${readResponse.data.Id})`,
		//                     {},
		//                     {
		//                         headers: {
		//                             ...config.headers,
		//                             "Accept": "application/json:odata=verbose"
		//                         }
		//                     }
		//                 ),
		//             //break permissions on library
		//             BreakInheritanceOnList()
		//             .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
		//                     {},
		//                     {
		//                         headers: {
		//                             ...config.headers,
		//                             "Accept": "application/json:odata=verbose"
		//                         }
		//                     }
		//                 ),
		//             //break permissions on list
		//             BreakInheritanceOnList()
		//             .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/breakRoleInheritance(copyRoleAssignments=false,clearSubscopes=false)`,
		//                     {},
		//                     {}
		//                 )
		//                 ]).then(.spread((proponentResponse, webPermissionsResponse, libraryPermissionsResponse, listPermissionsResponse) => {
		//                     setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
		//                         .all([
		//                 //set permissions on library
		//                 SetPermissionsOnSite()
		//                 .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
		//                             {},
		//                             {}),
		//                 .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
		//                                 {},
		//                                 {}),
		//                 .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${contributeResponse.data.Id})`,
		//                                     {},
		//                                     {}),
		//                 //set permissions on list
		//                 SetPermissionsOnSite
		//                 .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteOwnerResponse.data.Id},roledefid=${fullControlResponse.data.Id})`,
		//                                         {},
		//                                         {}),
		//                 .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${siteMemberResponse.data.Id},roledefid=${contributeResponse.data.Id})`,
		//                                             {},
		//                                             {}),
		//                 .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/addRoleAssignment(principalid=${newProponent.GroupId},roledefid=${contributeResponse.data.Id})`,
		//                                                 {},
		//                                                 {})
		//                         ]).then(.spread((libraryOwnerPermsResponse, libraryMembersPermsResponse, libraryProponentPermsResponse, listOwnerPermsResponse, listMembersPermsResponse, listProponentPermsResponse) => {
		//                             setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
		//                                 //remove current user perms on list
		//                                 RemovePermissionsOnList()
		//                                 .all([
		//                     .post(`${webFullUrl}/_api/web/Lists('${libraryResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${currentUser.Id},roledefid=${fullControlResponse.data.Id})`,
		//                                     {},
		//                                     {}
		//                                 ),
		//                     .post(`${webFullUrl}/_api/web/Lists('${listResponse.data.Id}')/RoleAssignments/removeRoleAssignment(principalid=${currentUser.Id},roledefid=${fullControlResponse.data.Id})`,
		//                                     {},
		//                                     {}
		//                                 )
		//                                 ]).then(.spread((currentUserLibrary, currentUserList) => {
		//                                     setProgress(0)
		//                                     //update table
		//                                     props.close()
		//                                 }))
		//                         }))
		//                 }))
		//         }))
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id='form-dialog-title'>
				Add a new Proponent
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='proponentName'
					label="Proponent's Name"
					type='text'
					fullWidth
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave} color='primary'>
					Save
				</Button>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
