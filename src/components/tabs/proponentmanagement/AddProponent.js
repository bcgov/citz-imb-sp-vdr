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
	GetCurrentUser,
	GetListDefaultView,
	RemoveListViewAllFields,
	AddListViewField,
} from 'citz-imb-sp-utilities'
import makeUUID from '../../utilities/makeUUID.js'

export const AddProponent = (name) => {
	let group, library, list, assocGroups, roles, currentUser, defaultView
	const uniqueId = makeUUID()

	return new Promise((resolve, reject) => {
		Promise.all([
			CreateGroup({ groupName: uniqueId }),
			CreateList({ listName: uniqueId, baseTemplate: 101 }), //create proponent library
			CreateList({ listName: `${uniqueId}_Questions` }), //create proponent question list
			GetAssociatedGroups(),
			GetRoleDefinitions({}),
			GetCurrentUser({}),
		]).then((response1) => {
			;[group, library, list, assocGroups, roles, currentUser] = response1
			Promise.all([
				GetListDefaultView({ listGUID: list.Id }), //proponent question list default view - need results of CreateList
				AddItemsToList({
					listName: 'Proponents',
					items: {
						Title: name,
						UUID: uniqueId,
						GroupId: group.Id,
					},
				}), //add to proponents list - need results of CreateGroup
				AddPermissionsToSite({
					principalId: group.Id,
					roleDefId: roles['Read'].Id,
				}), //add proponent group to see site - need results of CreateGroup
				BreakListPermissionsInheritance({
					listGUID: library.Id,
					copy: false,
					clear: true,
				}), //proponent library - need results of CreateList
				BreakListPermissionsInheritance({
					listGUID: list.Id,
					copy: false,
					clear: true,
				}), //proponent question list - need results of CreateList
				ChangeGroupOwner({
					groupId: group.Id,
					ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
				}), //proponent group - need results of CreateGroup and GetAssociatedGroups
			]).then((response2) => {
				defaultView = response2[0]
				Promise.all([
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedOwnerGroup.Id,
						roleDefId: roles['Full Control'].Id,
					}), //proponent library - Owner - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedMemberGroup.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent library - Member - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedVisitorGroup.Id,
						roleDefId: roles['Read'].Id,
					}), //proponent library - Visitor - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent library - Proponent - need results of CreateList and CreateGroup

					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedOwnerGroup.Id,
						roleDefId: roles['Full Control'].Id,
					}), //proponent question list - Owner - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedMemberGroup.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent question list - Member - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedVisitorGroup.Id,
						roleDefId: roles['Read'].Id,
					}), //proponent question list - Visitor - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent question list - Proponent - need results of CreateList and CreateGroup
					RemoveListViewAllFields({
						listGUID: list.Id,
						viewGUID: defaultView.Id,
					}), //proponent question list- need results of GetListDefaultView
				])
					.then((response3) => {
						//TODO: remove current user permissions from lists
						AddListViewField({
							listGUID: list.Id,
							viewGUID: defaultView.Id,
							field: 'Title',
						}).then((response4) => {
							AddListViewField({
								listGUID: list.Id,
								viewGUID: defaultView.Id,
								field: 'Created',
							}).then((response5) => {
								resolve()
							})
						})
						//console.log(`currentUser`, currentUser)
					})
					.catch((error) => {
						reject(error)
					})
			})
		})
	})
}
