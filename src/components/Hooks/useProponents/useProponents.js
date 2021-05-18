import {
  // SendConfirmationEmail,
  useConfig,
  useCurrentUser,
  useList,
  useLogAction,
} from 'components/Hooks'
import {
  AddPermissionsToList,
  DeleteGroup,
  GetGroupMembers,
  GetRoleDefinitions,
  RemovePermissionsFromList,
} from 'components/Api'
import { createProponent } from './createProponent/createProponent'
import { createProponentGroup } from './createProponentGroup/createProponentGroup'
import { setProponentPermissions } from './setProponentPermissions/setProponentPermissions'
import { useCallback, useState, useEffect } from 'react'

export const useProponents = () => {
  const [allUserIds, setAllUserIds] = useState([])

  const currentUser = useCurrentUser()
  const proponents = useList({
    listName: 'Proponents',
    preRequisite: currentUser.Id,
  })
  const config = useConfig()
  const logAction = useLogAction()

  // const contactEmail = config.items.filter(
  //   (item) => item.Key === 'contactEmail'
  // )[0]

  const allowSubmissions = config.items.filter(
    (item) => item.Key === 'allowSubmissions'
  )[0]

  const add = async (proponentName) =>
    await createProponent(proponentName, { proponents, currentUser, logAction })

  const setActive = async (UUID) => {
    const group = await createProponentGroup(UUID)

    await setProponentPermissions(UUID, group)

    const currentProponent = proponents.items.filter(
      (item) => item.UUID === UUID
    )[0]
    await proponents.updateItem([
      { Id: currentProponent.Id, Active: true, GroupId: group },
    ])
  }

  const setInactive = async (UUID) => {
    const currentProponent = proponents.items.filter(
      (item) => item.UUID === UUID
    )[0]
    await DeleteGroup({
      groupId: currentProponent.GroupId,
    })
    await proponents.updateItem([
      { Id: currentProponent.Id, Active: false, GroupId: 0 },
    ])
  }

  // const addUser = async (userId, UUID) => {
  //   alert('addUserToProponent')
  // }

  // const removeUser = async (userId, UUID) => {
  //   alert('removeUserFromProponent')
  // }

  const getUserIds = useCallback(async () => {
    const userIds = []
    for (let i = 0; i < proponents.items.length; i++) {
      const members = await GetGroupMembers({
        groupId: proponents.items[i].GroupId,
      })
      userIds.push(...members.map((member) => member.LoginName))
    }
    setAllUserIds(userIds)
  }, [proponents.items])

  useEffect(() => {
    if (!proponents.isLoading && !proponents.isFetching) getUserIds()

    return () => {}
  }, [proponents.isLoading, proponents.isFetching, getUserIds])

  const get = (UUID) => {
    return proponents.items.filter((item) => item.UUID === UUID)[0]
  }

  const sendEmailToProponents = async (props) => {
    // const { subject, body } = props

    for (let i = 0; i < proponents.items.length; i++) {
      const groupMembers = await GetGroupMembers({
        groupId: proponents.items[i].GroupId,
      })
      if (groupMembers.length) {
        // await SendConfirmationEmail({
        //   addresses: groupMembers.map((member) => member.LoginName),
        //   proponent: proponents.items[i].Title,
        //   subject,
        //   body,
        //   contactEmail,
        //   additionalReplacementPairs: [
        //     {
        //       searchvalue: /\[UserName\]/g,
        //       newvalue: currentUser.name,
        //     },
        //   ],
        // })
      }
    }
  }

  const toggleAllowSubmissions = async () => {
    const roles = await GetRoleDefinitions()

    const activeProponents = proponents.items.filter(
      (proponent) => proponent.Active === true
    )

    config.updateItem({
      Id: allowSubmissions.Id,
      YesNoValue: !allowSubmissions.YesNoValue,
    })

    for (const proponent of activeProponents) {
      if (allowSubmissions.YesNoValue) {
        await RemovePermissionsFromList({
          listName: proponent.UUID,
          principalId: proponent.GroupId,
          roleDefId: roles.Contribute.Id,
        })
        await AddPermissionsToList({
          listName: proponent.UUID,
          principalId: proponent.GroupId,
          roleDefId: roles.Read.Id,
        })
      } else {
        await RemovePermissionsFromList({
          listName: proponent.UUID,
          principalId: proponent.GroupId,
          roleDefId: roles.Read.Id,
        })
        await AddPermissionsToList({
          listName: proponent.UUID,
          principalId: proponent.GroupId,
          roleDefId: roles.Contribute.Id,
        })
      }
    }
  }

  return {
    add,
    // addUser,
    get,
    isLoading: proponents.isLoading || config.isLoading,
    // proponents,
    items: proponents.items,
    // removeUser,
    sendEmailToProponents,
    setActive,
    setInactive,
    allowSubmissions: allowSubmissions?.YesNoValue,
    toggleAllowSubmissions,
    allUserIds,
    reQuery: proponents.reQuery,
  }
}
