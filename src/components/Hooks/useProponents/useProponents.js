import {
  useConfig,
  useCurrentUser,
  useList,
  useLogAction,
} from 'components/Hooks'
import { SendConfirmationEmail } from 'components/Reusable'
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
import { useCallback, useState, useEffect, useMemo } from 'react'

export const useProponents = () => {
  const [allUserIds, setAllUserIds] = useState([])

  const currentUser = useCurrentUser()

  const proponents = useList('Proponents', {
    preRequisite: currentUser.Id,
  })
  const config = useConfig()
  const logAction = useLogAction()

  // const contactEmail = config.items.filter(
  //   (item) => item.Key === 'contactEmail'
  // )[0]

  const allowSubmissions = useMemo(
    () => config.items.filter((item) => item.Key === 'allowSubmissions')[0],
    [config.items]
  )

  const add = useCallback(
    async (proponentName) =>
      await createProponent(proponentName, {
        proponents,
        currentUser,
        logAction,
      }),
    [currentUser, logAction, proponents]
  )

  const setActive = useCallback(
    async (UUID) => {
      const group = await createProponentGroup(UUID)

      await setProponentPermissions(UUID, group)

      const currentProponent = proponents.items.filter(
        (item) => item.UUID === UUID
      )[0]
      await proponents.updateItem([
        { Id: currentProponent.Id, Active: true, GroupId: group },
      ])
    },
    [proponents]
  )

  const setInactive = useCallback(
    async (UUID) => {
      const currentProponent = proponents.items.filter(
        (item) => item.UUID === UUID
      )[0]
      await DeleteGroup({
        groupId: currentProponent.GroupId,
      })
      await proponents.updateItem([
        { Id: currentProponent.Id, Active: false, GroupId: 0 },
      ])
    },
    [proponents]
  )

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

  const get = useCallback(
    (UUID) => {
      return proponents.items.filter((item) => item.UUID === UUID)[0]
    },
    [proponents.items]
  )

  const sendEmailToProponents = useCallback(
    async (props) => {
      const { subject, body } = props

      for (let i = 0; i < proponents.items.length; i++) {
        const groupMembers = await GetGroupMembers({
          groupId: proponents.items[i].GroupId,
        })
        if (groupMembers.length) {
          console.log('groupMembers :>> ', groupMembers)
          await SendConfirmationEmail({
            addresses: groupMembers.map((member) => member.LoginName),
            proponent: proponents.items[i].Title,
            subject,
            body,
            contactEmail: 'Scott.Toews@gov.bc.ca',
            additionalReplacementPairs: [
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
            ],
          })
        }
      }
    },
    [currentUser.name, proponents.items]
  )

  const toggleAllowSubmissions = useCallback(async () => {
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
  }, [allowSubmissions, config, proponents])

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
