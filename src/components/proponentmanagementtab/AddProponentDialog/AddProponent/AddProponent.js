import {
	AddPermissionsToSite,
	GetAssociatedGroups,
	AddItemsToList,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'
import {
	//MakeUniqueID,
	AddPermissionsToActivityLog,
	CreateProponentGroup,
	CreateProponentLibrary,
	CreateProponentQuestionList,useLogAction
} from 'Components'

export const AddProponent = async (
	proponentName,
	enqueueSnackbar,
	roles,
	closeDialog
) => {
	const LogAction = useLogAction()
	const uniqueId=''// = MakeUniqueID()

	const currentUser = await GetCurrentUser({})
	const associatedGroups = await GetAssociatedGroups()

	const group = await CreateProponentGroup({
		groupName: uniqueId,
		associatedGroups: associatedGroups,
	})
	enqueueSnackbar('Created Proponent Group', {
		variant: 'success',
	})

	const proponentLibrary = await CreateProponentLibrary({
		listName: uniqueId,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})
	enqueueSnackbar('Created Proponent Library', {
		variant: 'success',
	})

	const proponentQuestionList = await CreateProponentQuestionList({
		listName: `${uniqueId}_Questions`,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})
	enqueueSnackbar('Created Proponent Question List', {
		variant: 'success',
	})

	let proponents = await AddItemsToList({
		listName: 'Proponents',
		items: {
			Title: proponentName,
			UUID: uniqueId,
			GroupId: group.Id,
		},
	})
	enqueueSnackbar('Added Proponent to Proponent List', {
		variant: 'success',
	})

	let sitePermissions = await AddPermissionsToSite({
		principalId: group.Id,
		roleDefId: roles['Read'].Id,
	})
	enqueueSnackbar('Granted Proponent Group access to site', {
		variant: 'success',
	})

	let ActivityLogPermissions = await AddPermissionsToActivityLog(group, roles)
	LogAction(`added ${proponentName}`)
	closeDialog()
}
