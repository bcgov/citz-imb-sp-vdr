import {
  BreakListPermissionsInheritance,
  GetAssociatedGroups,
  GetRoleDefinitions,
} from 'components/Api'
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

  logAction('creating proponent group...', { variant: 'warning' })
  const group = await createProponentGroup(UUID)
  logAction('proponent group created', {
    variant: 'success',
    snackbarOnly: true,
  })

  const roles = await GetRoleDefinitions({})
  const associatedGroups = await GetAssociatedGroups()

  logAction('creating proponent library...', {
    variant: 'warning',
    snackbarOnly: true,
  })
  await createProponentLibrary(UUID, {
    currentUser,
    roles,
    associatedGroups,
    baseTemplate: 101,
  })
  logAction('proponent library created', {
    variant: 'success',
    snackbarOnly: true,
  })

  logAction('creating proponent question list...', {
    variant: 'warning',
    snackbarOnly: true,
  })
  await createQuestionList(`${UUID}_Questions`, {
    currentUser,
    roles,
    associatedGroups,
  })
  logAction('proponent question list created', {
    variant: 'success',
    snackbarOnly: true,
  })

  logAction('setting proponent permissions...', {
    variant: 'warning',
    snackbarOnly: true,
  })
  await setProponentPermissions(UUID, group)
  logAction('proponent permissions set', {
    variant: 'success',
    snackbarOnly: true,
  })

  await addProponentToProponentsList(proponentName, {
    proponents,
    UUID,
    group,
  })

  return { UUID, group }
}
