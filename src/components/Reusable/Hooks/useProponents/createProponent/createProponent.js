import {
	BreakListPermissionsInheritance,
	GetAssociatedGroups,
	GetRoleDefinitions,
} from 'components/ApiCalls'
import { createProponentGroup } from '../createProponentGroup/createProponentGroup'
import { setProponentPermissions } from '../setProponentPermissions/setProponentPermissions'
import { addProponentToProponentsList } from './addProponentToProponentsList/addProponentToProponentsList'
import { createProponentLibrary } from './createProponentLibrary/createProponentLibrary'
import { createQuestionList } from './createQuestionList/createQuestionList'
import { MakeUniqueID } from './MakeUniqueID/MakeUniqueID'

export const createProponent = async (
	proponentName,
	{ proponents, currentUser, logAction }
) => {
	const UUID = MakeUniqueID()

	await BreakListPermissionsInheritance({ listName: 'ActivityLog' })

	logAction('creating proponent group...', true, 'info', true)
	const group = await createProponentGroup(UUID)
	logAction('proponent group created', true, 'success', true)

	const roles = await GetRoleDefinitions({})
	const associatedGroups = await GetAssociatedGroups()

	logAction('creating proponent library...', true, 'info', true)
	await createProponentLibrary(UUID, {
		currentUser,
		roles,
		associatedGroups,
		baseTemplate: 101,
	})
	logAction('proponent library created', true, 'success', true)

	logAction('creating proponent question list...', true, 'info', true)
	await createQuestionList(`${UUID}_Questions`, {
		currentUser,
		roles,
		associatedGroups,
	})
	logAction('proponent question list created', true, 'success', true)

	logAction('setting proponent permissions...', true, 'info', true)
	await setProponentPermissions(UUID, group)
	logAction('proponent permissions set', true, 'success', true)

	await addProponentToProponentsList(proponentName, {
		proponents,
		UUID,
		group,
	})

	return { UUID, group }
}
