import {
  AddPermissionsToList,
  BreakListPermissionsInheritance,
  CreateList,
  RemovePermissionsFromList,
} from 'components/Api'

export const createProponentLibrary = async (
  listName,
  { currentUser, roles, associatedGroups, ...listProps }
) => {
  const list = await CreateList({ listName, ...listProps })

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

  return list
}
