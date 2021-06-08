import {
  AddPermissionsToList,
  DeleteGroup,
  GetRoleDefinitions,
  RemovePermissionsFromList,
} from 'components/Api'
import {
  useConfig,
  useCurrentUser,
  useList,
  useLogAction,
} from 'components/Hooks'
import { useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { createProponent } from './createProponent/createProponent'
import { createProponentGroup } from './createProponentGroup/createProponentGroup'
import { getProponents } from './getProponents'
import { setProponentPermissions } from './setProponentPermissions/setProponentPermissions'

export const useProponents = () => {
  const currentUser = useCurrentUser()
  const config = useConfig()
  const logAction = useLogAction()

  const proponentsList = useList('Proponents')
  const { data, isLoading, isError, refetch } = useQuery(
    ['Proponents', 'data'],
    () => getProponents()
  )

  const allowSubmissions = useMemo(
    () =>
      config.items.filter((item) => item.Key === 'allowSubmissions')[0]
        .YesNoValue,
    [config.items]
  )
  const allowSubmissionsId = useMemo(
    () => config.items.filter((item) => item.Key === 'allowSubmissions')[0].Id,
    [config.items]
  )

  const add = useCallback(
    async (proponentName) =>
      await createProponent(proponentName, {
        proponents: proponentsList,
        currentUser,
        logAction,
      }),
    [currentUser, logAction, proponentsList]
  )

  const setActive = useCallback(
    async (UUID) => {
      const group = await createProponentGroup(UUID)

      await setProponentPermissions(UUID, group)

      const currentProponent = data.filter((item) => item.UUID === UUID)[0]
      await proponentsList.update([
        { Id: currentProponent.Id, Active: true, GroupId: group },
      ])
    },
    [data, proponentsList]
  )

  const setInactive = useCallback(
    async (UUID) => {
      const currentProponent = data.filter((item) => item.UUID === UUID)[0]
      await DeleteGroup({
        groupId: currentProponent.GroupId,
      })
      await proponentsList.update([
        { Id: currentProponent.Id, Active: false, GroupId: 0 },
      ])
    },
    [data, proponentsList]
  )

  const allUserLoginNames = useMemo(() => {
    if (isLoading || isError) return []
    const allUsers = []

    for (let i = 0; i < data.length; i++) {
      allUsers.push(...data[i].Users.map((user) => user.LoginName))
    }

    return allUsers
  }, [data, isLoading, isError])

  const get = useCallback(
    (UUID) => {
      return data.filter((item) => item.UUID === UUID)[0]
    },
    [data]
  )

  const toggleAllowSubmissions = useCallback(async () => {
    const roles = await GetRoleDefinitions()

    const activeProponents = data.filter(
      (proponent) => proponent.Active === true
    )
    console.log('activeProponents :>> ', activeProponents)

    console.log('allowSubmissions :>> ', allowSubmissions)

    for (const proponent of activeProponents) {
      console.log('forloop', proponent)
      if (allowSubmissions) {
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

    config.update({
      Id: allowSubmissionsId,
      YesNoValue: !allowSubmissions,
    })
  }, [allowSubmissionsId, allowSubmissions, config, data])

  return {
    add,
    get,
    isLoading: isLoading || config.isLoading,
    items: data,
    setActive,
    setInactive,
    allowSubmissions: allowSubmissions,
    toggleAllowSubmissions,
    refetch,
    allUserLoginNames,
  }
}
