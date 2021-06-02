import {
  AddUsersToGroup,
  ChangeGroupOwner,
  DeleteGroup,
  RemoveUsersFromGroup,
} from 'components/Api'
import { useMutation, useQueryClient } from 'react-query'
import { useCallback, useMemo } from 'react'

export const useGroupMutations = (groupId, options = {}) => {
  const {
    removeMemberCallback = () => {},
    addMemberCallback = () => {},
    deleteCallback = () => {},
    changeOwnerCallback = () => {},
  } = options

  const queryName = useMemo(() => ['Group', groupId], [groupId])

  //   const currentUser = useCurrentUser()

  const queryClient = useQueryClient()

  //   const { status, data } = queryClient.getQueryState(listName)

  const onSettled = useCallback(async () => {
    console.log('onSettled')
    await queryClient.invalidateQueries(queryName)
    console.log('onSettled end')
  }, [queryClient, queryName])

  const onError = useCallback(
    (error, variables, context) => {
      console.error('error: ', error)
      queryClient.setQueryData(queryName, context.previousValues)
    },
    [queryClient, queryName]
  )

  const addMembersMutation = useMutation(
    (newMembers) =>
      AddUsersToGroup({
        groupId,
        loginNames: newMembers.members.map((user) => user.Key),
      }),
    {
      onMutate: async (newMembers) => {
        console.log('onMutate')
        await queryClient.cancelQueries(queryName)

        const previousValues = queryClient.getQueryData(queryName)

        await queryClient.setQueryData(queryName, (oldValues) => {
          let newValues = [...oldValues.members]

          newMembers.members.map((member, index) => {
            newValues.push({
              Id: `temp_${index}`,
              Email: member.EntityData.Email,
              Title: member.EntityData.DisplayName,
              LoginName: member.Key,
            })
            return member
          })
          console.log('onMutate End')
          return { group: oldValues.group, members: newValues }
        })

        return { previousValues }
      },
      onError,
      onSuccess: async (data, variables, context) => {
        console.log('onSuccess')
        await queryClient.cancelQueries()
        await addMemberCallback(data, variables, context)
        setTimeout(() => {
          queryClient.invalidateQueries(queryName, {
            exact:true,
            refetchActive: true,
            refetchInactive: true,
          })
        }, 10000)
        // await queryClient.invalidateQueries()
        console.log('onSuccess end')
      },
      // onSettled: async () => await queryClient.invalidateQueries(queryName),
    }
  )

  const removeMemberMutation = useMutation(
    (userId) =>
      RemoveUsersFromGroup({
        groupId,
        userIds: userId,
      }),
    {
      onMutate: (userId) => {
        const previousValues = queryClient.getQueryData(queryName)

        queryClient.setQueryData(queryName, (oldValues) => {
          return {
            ...oldValues,
            members: oldValues.members.filter((member) => member.Id !== userId),
          }
        })

        return { previousValues }
      },
      onError,
      onSuccess: async (data, variables, context) =>
        await removeMemberCallback(data, variables, context),
      onSettled,
    }
  )

  const changeOwnerMutation = useMutation(
    (newOwnerId) =>
      ChangeGroupOwner({
        groupId,
        ownerGroupId: newOwnerId,
      }),
    {
      onError,
      onSuccess: () => changeOwnerCallback(),
      onSettled,
    }
  )

  const deleteGroupMutation = useMutation(
    () =>
      DeleteGroup({
        groupId,
      }),
    {
      onError,
      onSuccess: () => deleteCallback(),
      onSettled,
    }
  )

  return {
    addMembers: addMembersMutation.mutateAsync,
    removeMember: removeMemberMutation.mutateAsync,
    changeOwner: changeOwnerMutation.mutateAsync,
    delete: deleteGroupMutation.mutateAsync,
  }
}
