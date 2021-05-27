import { Alert } from '@material-ui/lab'
import { useCurrentUser, useList, useLogAction } from 'components/Hooks'
import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { SPList } from 'components/SharePoint'
import React from 'react'
import { AskQuestion } from './AskQuestion'

export const ProponentQuestionList = () => {
  const currentUser = useCurrentUser()
  const logAction = useLogAction()
  const proponentQuestionListName = `${currentUser.proponent}_Questions`

  const { updateItem } = useList({ listName: proponentQuestionListName })

  const handleWithdraw = async (row) => {
    try {
      await updateItem({
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
  }

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
            proponentQuestionsListName={proponentQuestionListName}
          />
        )
      },
    },
  ]

  const tableProps = {
    title: 'Submitted Questions',
    columnFiltering: true,
    tableActions: [<AskQuestion listName={proponentQuestionListName} />],
  }

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  return (
    <SPList
      listName={proponentQuestionListName}
      customColumns={customColumns}
      initialState={initialState}
      tableProps={tableProps}
    />
  )
}
