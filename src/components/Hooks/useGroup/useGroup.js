import { useProponents } from 'components/Hooks'
import { useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { AddMember } from './AddMember/AddMember'
import { removeMemberColumn } from './customColumns/removeMemberColumn'
import { getGroup } from './getGroup/getGroup'
import { useGroupMutations } from './useGroupMutations/useGroupMutations'

export const useGroup = (groupId, options = {}) => {
  const {
    allowRemoveMember = false,
    allowAddMember = false,
    addMemberCallback,
    removeMemberCallback,
  } = options
  const queryName = useMemo(() => ['Group', groupId], [groupId])

  const proponents = useProponents()

  const { data, isFetching, isLoading, isError } = useQuery(queryName, () =>
    getGroup(groupId)
  )

  const members = useMemo(() => {
    if (isLoading || isError) return []
    return data.members
  }, [data, isError, isLoading])

  const { addMembers, removeMember } = useGroupMutations(groupId, {
    addMemberCallback,
    removeMemberCallback,
  })

  const columns = useMemo(() => {
    const cols = [
      {
        Header: 'Title',
        accessor: 'Title',
        Filter: true,
        disableFilters: true,
      },
      {
        Header: 'E-mail',
        accessor: 'Email',
        Filter: true,
        disableFilters: true,
      },
    ]

    if (allowRemoveMember) cols.push(removeMemberColumn(removeMember))

    return cols
  }, [allowRemoveMember, removeMember])

  const table = useTable(
    {
      columns,
      data: members,
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const addMemberSubmit = useCallback(
    async (values) => {
      for (let i = 0; i < values.members.length; i++) {
        if (proponents.allUserIds.includes(values.members[i].Key)) {
          alert(
            `${values.members[i].DisplayText} is already a member of a proponent`
          )
          return
        }
      }

      await addMembers(values)
    },
    [addMembers, proponents.allUserIds]
  )

  const tableActions = useMemo(() => {
    if (allowAddMember)
      return [
        <AddMember addMemberSubmit={addMemberSubmit}>Add Member</AddMember>,
      ]
    return []
  }, [addMemberSubmit, allowAddMember])

  return {
    members,
    isLoading,
    isFetching,
    table: { ...table, tableActions },
    // ...group.data,
    // isLoading: group.isLoading,
    // isError: group.isError,
    // isMutating: changeGroupOwnerMutation.isLoading
    //   ? true
    //   : deleteGroupMutation.isLoading
    //   ? true
    //   : addMemberMutation.isLoading
    //   ? true
    //   : removeMemberMutation.isLoading
    //   ? true
    //   : false,
    // changeGroupOwner: changeGroupOwnerMutation.mutateAsync,
    // deleteGroup: deleteGroupMutation.mutateAsync,
    // addMember: addMemberMutation.mutateAsync,
    removeMember,
  }
}
