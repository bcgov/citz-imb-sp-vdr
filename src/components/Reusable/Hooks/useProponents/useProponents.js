import { useState, useEffect, useMemo } from 'react'
import { useSnackbar } from 'notistack'
import { useList } from 'Components'
import {
	AddPermissionsToList,
	AddPermissionsToSite,
	BreakListPermissionsInheritance,
	ChangeGroupOwner,
	CreateGroup,
	CreateList,
	GetRoleDefinitions,
	GetAssociatedGroups,
	GetListItems,
	DeleteGroup,
	RemovePermissionsFromList,
	GetCurrentUser,
	AddFieldToList,
	GetListDefaultView,
	RemoveListViewAllFields,
	AddListViewField,
	UpdateField,
	CreateView,
} from 'citz-imb-sp-utilities'

export const useProponents = () => {
	//const [proponents, setProponents] = useState()
	const [proponentsObject, setProponentsObject] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const {
		addItem,
		isLoading: listIsLoading,
		items,
		refresh,
		updateItem,
	} = useList('Proponents')
	const { enqueueSnackbar } = useSnackbar()

	const MakeUniqueID = () => {
		return (
			'V' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.toUpperCase()
		)
	}

	const createProponentGroup = async (UUID) => {
		const associatedGroups = await GetAssociatedGroups()
		const group = await CreateGroup({ groupName: UUID })

		try {
			ChangeGroupOwner({
				groupId: group.Id,
				ownerGroupId: associatedGroups.AssociatedOwnerGroup.Id,
			})
		} catch {
			console.warn('unable to change group owner')
		}

		return group.Id
	}

	const setProponentPermissions = async (UUID, groupId) => {
		const roles = await GetRoleDefinitions({})

		await AddPermissionsToSite({
			principalId: groupId,
			roleDefId: roles['Read'].Id,
		})

		await AddPermissionsToList({
			listName: UUID,
			principalId: groupId,
			roleDefId: roles['Contribute'].Id,
		})

		await AddPermissionsToList({
			listName: `${UUID}_Questions`,
			principalId: groupId,
			roleDefId: roles['Contribute'].Id,
		})

		await AddPermissionsToList({
			listName: 'ActivityLog',
			principalId: groupId,
			roleDefId: roles['Read with Add'].Id,
		})
	}

	const createList = async (props) => {
		const roles = await GetRoleDefinitions({})
		const associatedGroups = await GetAssociatedGroups()
		const currentUser = await GetCurrentUser({})
		const list = await CreateList(props)

		await BreakListPermissionsInheritance({
			listGUID: list.Id,
			copy: false,
			clear: true,
		})

		await AddPermissionsToList({
			//owners
			listGUID: list.Id,
			principalId: associatedGroups.AssociatedOwnerGroup.Id,
			roleDefId: roles['Full Control'].Id,
		})

		await AddPermissionsToList({
			//members
			listGUID: list.Id,
			principalId: associatedGroups.AssociatedMemberGroup.Id,
			roleDefId: roles['Contribute'].Id,
		})

		await AddPermissionsToList({
			//visitors
			listGUID: list.Id,
			principalId: associatedGroups.AssociatedVisitorGroup.Id,
			roleDefId: roles['Read'].Id,
		})

		await RemovePermissionsFromList({
			listGUID: list.Id,
			principalId: currentUser.Id,
			roleDefId: roles['Full Control'].Id,
		})

		return list
	}

	const createQuestionList = async (listName) => {
		const questionList = await createList({ listName })
		const listGUID = questionList.Id

		await AddFieldToList({
			listGUID,
			field: [
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
					DefaultValue: 'Not Started',
				},
				{
					FieldTypeKind: 2,
					Title: 'Assignee',
				},
			],
		})

		await UpdateField({
			listGUID,
			fieldName: 'AnswerStatus',
			field: { Title: 'Answer Status' },
		})

		await UpdateField({
			listGUID,
			fieldName: 'Title',
			field: { Title: 'Question' },
		})

		await UpdateField({
			listGUID,
			fieldName: 'Created By',
			field: { Title: 'Submitted By' },
		})

		const defaultView = await GetListDefaultView({ listGUID })
		const viewGUID = defaultView.Id

		await RemoveListViewAllFields({ listGUID, viewGUID })

		await AddListViewField({ listGUID, viewGUID, field: 'Question' })

		await AddListViewField({ listGUID, viewGUID, field: 'Answer' })

		await AddListViewField({ listGUID, viewGUID, field: 'Submitted By' })

		await AddListViewField({ listGUID, viewGUID, field: 'Created' })

		const VICOManagerView = await CreateView({
			listGUID,
			viewName: 'VICO Manager',
		})
		const managerViewId = VICOManagerView.Id

		await AddListViewField({
			listGUID,
			viewGUID: managerViewId,
			field: 'QuestionID',
		})

		await AddListViewField({
			listGUID,
			viewGUID: managerViewId,
			field: 'Assignee',
		})

		await AddListViewField({
			listGUID,
			viewGUID: managerViewId,
			field: 'Answer Status',
		})
	}

	const addProponent = async (proponentName) => {
		const UUID = MakeUniqueID()

		await BreakListPermissionsInheritance({ listName: 'ActivityLog' })

		const group = await createProponentGroup(UUID)
		enqueueSnackbar('created proponent group', { variant: 'warning' })

		await createList({ listName: UUID, baseTemplate: 101 })
		enqueueSnackbar('created proponent library', { variant: 'warning' })

		await createQuestionList(`${UUID}_Questions`)
		enqueueSnackbar('created proponent Question List', {
			variant: 'warning',
		})

		await setProponentPermissions(UUID, group)
		enqueueSnackbar('granted proponent site permissions', {
			variant: 'warning',
		})

		await addItem([
			{
				Title: proponentName,
				UUID: UUID,
				Active: true,
				GroupId: group,
			},
		])
		enqueueSnackbar('added proponent to proponent list', {
			variant: 'warning',
		})
		await refresh()
	}

	const setProponentActive = async (UUID) => {
		const group = await createProponentGroup(UUID)
		enqueueSnackbar('created proponent group', { variant: 'warning' })

		await setProponentPermissions(UUID, group)
		enqueueSnackbar('granted proponent site permissions', {
			variant: 'warning',
		})

		await updateItem([
			{ Id: proponentsObject[UUID].Id, Active: true, GroupId: group },
		])
		enqueueSnackbar('updated proponent list', { variant: 'warning' })
		await refresh()
	}

	const setProponentInactive = async (UUID) => {
		await DeleteGroup({
			groupId: proponentsObject[UUID].GroupId,
		})
		enqueueSnackbar('deleted proponent group', { variant: 'warning' })
		await updateItem([
			{ Id: proponentsObject[UUID].Id, Active: false, GroupId: 0 },
		])
		enqueueSnackbar('updated proponent list', { variant: 'warning' })
		await refresh()
	}

	const addUserToProponent = async (userId, UUID) => {
		alert('addUserToProponent')
	}

	const removeUserFromProponent = async (userId, UUID) => {
		alert('removeUserFromProponent')
	}

	const getProponent = (UUID) => {
		return proponentsObject[UUID]
	}

	const getQuestionCount = async (questionListName) => {
		const questions = await GetListItems({
			listName: questionListName,
		})

		return { asked: questions.length, answered: 0, withdrawn: 0 }
	}

	const proponents = useMemo(() => {
		return items
	}, [listIsLoading])

	useEffect(() => {
		const setUpProponents = async () => {
			let itemObject = {}

			for (let i = 0; i < items.length; i++) {
				itemObject[items[i].UUID] = { ...items[i] }

				itemObject[
					items[i].UUID
				].questionCount = await getQuestionCount(
					`${items[i].UUID}_Questions`
				)
			}

			setProponentsObject(itemObject)
		}

		if (!listIsLoading) {
			setUpProponents()
		} else {
			setIsLoading(true)
		}
		return () => {}
	}, [listIsLoading, proponents])

	useEffect(() => {
		if (proponents && proponentsObject) setIsLoading(false)

		return () => {}
	}, [proponents, proponentsObject])

	return {
		addProponent,
		setProponentActive,
		setProponentInactive,
		addUserToProponent,
		removeUserFromProponent,
		getProponent,
		isLoading,
		proponents,
	}
}
