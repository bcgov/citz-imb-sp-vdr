import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { useList, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'
import React, { useState } from 'react'
import { AnswerDialog } from './AnswerDialog'
import { Assignee } from './Assignee'

export const Questions = (props) => {
  const { UUID } = props

  const questionListName = `${UUID}_Questions`

  const { updateItem } = useList({
    listName: questionListName,
  })

  const logAction = useLogAction()

  const customColumns = [
    {
      Filter: SelectColumnFilter,
      accessor: 'AnswerStatus',
      Header: 'Status / Answer',
      Cell: ({ value, row }) => {
        return <AnswerCell row={row} value={value} />
      },
    },
    {
      Filter: SelectColumnFilter,
      accessor: 'Assignee',
      Cell: ({ value, row }) => {
        return row.original.AnswerStatus === 'Withdrawn' ? null : (
          <Assignee
            assignedTo={value}
            originalValues={row.original}
            changeAssignee={changeAssignee}
            updateAnswer={updateAnswer}
          />
        )
      },
    },
  ]

  const tableProps = {
    columnFiltering: true,
    showTitle: false,
  }

  const [dialogOptions, setDialogOptions] = useState({ open: false, UUID })

  const closeAnswerDialog = () => {
    setDialogOptions({ open: false, UUID })
  }

  const changeAssignee = (value, QuestionID, Id, Question) => {
    if (value === 'post') {
      postAnswer({ QuestionID, Id, Question })
    } else {
      updateItem({
        Id: Id,
        AnswerStatus: 'Under Review',
        Assignee: value,
      })
      logAction(`assigned ${QuestionID} to ${value}`)
    }
  }

  const postAnswer = (props) => {
    const { QuestionID, Id, Question } = props
    setDialogOptions({
      open: true,
      QuestionID,
      Id,
      Question,
      UUID,
      closeAnswerDialog,
    })
  }

  const updateAnswer = (props) => {
    const { QuestionID, Id, Question, Answer } = props

    setDialogOptions({
      open: true,
      isUpdate: true,
      QuestionID,
      AnswerId: parseInt(Answer),
      Id,
      Question,
      Answer,
      UUID,
      closeAnswerDialog,
    })
  }

  return (
    <>
      <SPList
        listName={questionListName}
        customColumns={customColumns}
        tableProps={tableProps}
      />
      <AnswerDialog {...dialogOptions} />
    </>
  )
}
