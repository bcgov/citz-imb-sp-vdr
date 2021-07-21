import { Alert } from '@material-ui/lab'
import {
  useCurrentUser,
  useEmail,
  useList,
  useLogAction,
} from 'components/Hooks'
import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { SPList } from 'components/SharePoint'
import React, { useCallback } from 'react'

export const ProponentQuestionList = () => {
  const currentUser = useCurrentUser()
  const listName = `${currentUser.proponent}_Questions`

  const { sendEmailToCurrentProponentMembers } = useEmail()

  const logAction = useLogAction()

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
        sendEmailToCurrentProponentMembers('withdrawQuestionEmail', {
          currentUser,
        })
      } catch (error) {
        console.error(error)
        logAction(`failed to withdraw '${row.values.Question}'`, {
          variant: 'error',
        })
      }
    },
    [currentUser, logAction, sendEmailToCurrentProponentMembers, update]
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
      title={'Questions'}
      columnFiltering={true}
      allowUpload={true}
      noRecordsText={'Your organization has not submitted any questions yet'}
    />
  )
}
