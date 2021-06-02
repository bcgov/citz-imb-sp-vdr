import { Alert, AlertTitle } from '@material-ui/lab'
import { useGroup } from 'components/Hooks'
import { SPTable } from 'components/SharePoint'
import React from 'react'

export const SPGroup = (props) => {
  const {
    groupId,
    allowRemoveMember,
    allowAddMember,
    addMemberCallback,
    removeMemberCallback,
    ...tableProps
  } = props

  const { table, isLoading, isError, error, isFetching } = useGroup(groupId, {
    allowRemoveMember,
    allowAddMember,
    addMemberCallback,
    removeMemberCallback,
  })

  if (isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }

  return (
    <SPTable
      table={table}
      isFetching={isLoading || isFetching}
      {...tableProps}
    />
  )
}
