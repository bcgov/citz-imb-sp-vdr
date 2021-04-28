import {
	AddFieldToList,
	AddListViewField,
	AddPermissionsToList,
	BreakListPermissionsInheritance,
	CreateList,
	CreateView,
	GetListDefaultView,
	RemoveListViewAllFields,
	RemovePermissionsFromList,
	UpdateField,
} from 'components/ApiCalls'

export const createQuestionList = async (
	listName,
	{ currentUser, roles, associatedGroups }
) => {
	await CreateList({ listName })

	await AddFieldToList({
		listName,
		fields: [
			{
				FieldTypeKind: 3,
				Title: 'Question',
				Required: true,
			},
			{
				FieldTypeKind: 2,
				Title: 'Answer',
			},
			{
				FieldTypeKind: 2,
				Title: 'QuestionID',
			},
			{
				FieldTypeKind: 2,
				Title: 'AnswerStatus',
				DefaultValue: 'Received',
			},
			{
				FieldTypeKind: 2,
				Title: 'Assignee',
				DefaultValue: 'VICO Manager',
			},
			{
				FieldTypeKind: 8,
				Title: 'Withdrawn',
				DefaultValue: '0',
			},
		],
	})
	await UpdateField({
		listName,
		fieldName: 'AnswerStatus',
		field: { Title: 'Answer Status' },
	})

	await UpdateField({
		listName,
		fieldName: 'Title',
		field: { Required: false },
	})

	await UpdateField({
		listName,
		fieldName: 'Created By',
		field: { Title: 'Submitted By' },
	})
	const defaultView = await GetListDefaultView({ listName })
	const viewGUID = defaultView.Id

	await RemoveListViewAllFields({ listName, viewGUID })

	await AddListViewField({ listName, viewGUID, field: 'Question' })

	await AddListViewField({ listName, viewGUID, field: 'AnswerStatus' })

	await AddListViewField({ listName, viewGUID, field: 'Submitted By' })

	await AddListViewField({ listName, viewGUID, field: 'Created' })

	const VICOManagerView = await CreateView({
		listName,
		viewName: 'VICO_Manager',
	})

	const managerViewId = VICOManagerView.Id

	await AddListViewField({
		listName,
		viewGUID: managerViewId,
		field: 'QuestionID',
	})

	await AddListViewField({
		listName,
		viewGUID: managerViewId,
		field: 'Assignee',
	})

	await BreakListPermissionsInheritance({
		listName,
		copy: false,
		clear: true,
	})

	await AddPermissionsToList({
		//owners
		listName,
		principalId: associatedGroups.AssociatedOwnerGroup.Id,
		roleDefId: roles['Full Control'].Id,
	})

	await AddPermissionsToList({
		//members
		listName,
		principalId: associatedGroups.AssociatedMemberGroup.Id,
		roleDefId: roles['Contribute'].Id,
	})

	await AddPermissionsToList({
		//visitors
		listName,
		principalId: associatedGroups.AssociatedVisitorGroup.Id,
		roleDefId: roles['Read'].Id,
	})

	await RemovePermissionsFromList({
		listName,
		principalId: currentUser.id,
		roleDefId: roles['Full Control'].Id,
	})
}
