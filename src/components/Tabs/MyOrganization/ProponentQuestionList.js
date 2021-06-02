import { Alert } from '@material-ui/lab'
import { useCurrentUser, useList, useLogAction } from 'components/Hooks'
import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { SPList } from 'components/SharePoint'
import React, { useCallback, useMemo } from 'react'

export const ProponentQuestionList = () => {
  const currentUser = useCurrentUser()
  const logAction = useLogAction()
  const listName = `${currentUser.proponent}_Questions`

  const { update } = useList(listName)

  const handleWithdraw = useCallback(
    async (row) => {
      try {
        await update({
          Id: row.original.Id,
          Withdrawn: true,
          AnswerStatus: 'Withdrawn',
          Assignee: '',
        })
        logAction(`successfully withdrew '${row.values.Question}'`)
      } catch (error) {
        console.error(error)
        logAction(`failed to withdraw '${row.values.Question}'`, {
          variant: 'error',
        })
      }
    },
    [logAction, update]
  )

  const initialState = { sortBy: [{ id: 'Created', desc: true }] }

  const customColumns = [
    {
      Filter: SelectColumnFilter,
      accessor: 'AnswerStatus',
      Header: 'Status / Answer',
      Cell: ({ value, row }) => {
        return (
          <AnswerCell
            row={row}
            showWithdrawButton={true}
            handleWithdraw={handleWithdraw}
            value={value}
            listName={listName}
          />
        )
      },
    },
  ]

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  return (
    <SPList
      listName={listName}
      customColumns={customColumns}
      initialState={initialState}
      title={'Submitted Questions'}
      columnFiltering={true}
      allowUpload={true}
    />
  )
}
