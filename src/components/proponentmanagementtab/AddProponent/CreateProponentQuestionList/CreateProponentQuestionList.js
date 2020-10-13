import {
	AddPermissionsToList,
	CreateList,
	BreakListPermissionsInheritance,
	GetListDefaultView,
	RemoveListViewAllFields,
	AddListViewField,
	RemovePermissionsFromList,
	AddFieldToList,
} from 'citz-imb-sp-utilities'

export const CreateProponentQuestionList = async (props) => {
	const { listName, associatedGroups, roles, group, currentUser } = props

	const list = await CreateList({ listName: listName })

	const field = await AddFieldToList({ listName: listName, field: {
		FieldTypeKind: 2,
		Title: 'Answer'
	} })

	const defaultView = await GetListDefaultView({ listGUID: list.Id })

	const breakQuestionListInheritence = await BreakListPermissionsInheritance({
		listGUID: list.Id,
		copy: false,
		clear: true,
	})

	const addOwnersToList = await AddPermissionsToList({
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedOwnerGroup.Id,
		roleDefId: roles['Full Control'].Id,
	})

	const addMembersToList = await AddPermissionsToList({
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedMemberGroup.Id,
		roleDefId: roles['Contribute'].Id,
	})

	const addVisitorsToList = await AddPermissionsToList({
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedVisitorGroup.Id,
		roleDefId: roles['Read'].Id,
	})

	const addProponentsToList = await AddPermissionsToList({
		listGUID: list.Id,
		principalId: group.Id,
		roleDefId: roles['Read with Add'].Id,
	})

	const removeAllDefaultViewFields = await RemoveListViewAllFields({
		listGUID: list.Id,
		viewGUID: defaultView.Id,
	})

	const addTitleToDefaultView = await AddListViewField({
		listGUID: list.Id,
		viewGUID: defaultView.Id,
		field: 'Title',
	})

	const addCreatedToDefaultView = await AddListViewField({
		listGUID: list.Id,
		viewGUID: defaultView.Id,
		field: 'Created',
	})

	const addAnswerIdToDefaultView = await AddListViewField({
		listGUID: list.Id,
		viewGUID: defaultView.Id,
		field: 'Answer',
	})

	const removeCurrentUserPermissions = await RemovePermissionsFromList({
		listGUID: list.Id,
		principalId: currentUser,
		roleDefId: roles['Full Control'].Id,
	})

	return list
}
