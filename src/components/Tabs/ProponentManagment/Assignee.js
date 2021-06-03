import { AnswerDialog } from './AnswerDialog'
import { Button, MenuItem, Select } from '@material-ui/core'
import React, { useState, useCallback } from 'react'

import { useList, useLogAction } from 'components/Hooks'

const AssigneeOptions = [
  'VICO Manager',
  'Business SME',
  'Legal',
  'Procurement Branch',
  'Procurement Governance',
]

export const Assignee = (props) => {
  const { row, value, listName } = props

  const { AnswerStatus, QuestionID, Id } = row.original

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogEditOpen, setDialogEditOpen] = useState(false)

  const { update } = useList(listName)

  const logAction = useLogAction()

  const closeAnswerDialog = useCallback(() => {
    setDialogOpen(false)
    setDialogEditOpen(false)
  }, [])

  const changeAssignee = useCallback(
    (value) => {
      if (value === 'post') {
        setDialogOpen(true)
      } else {
        console.log('Id :>> ', Id)
        update({
          Id: Id,
          AnswerStatus: 'Under Review',
          Assignee: value,
        })
        logAction(`assigned ${QuestionID} to ${value}`)
      }
    },
    [Id, QuestionID, logAction, update]
  )

  const handleChange = useCallback(
    (event) => {
      changeAssignee(event.target.value)
    },
    [changeAssignee]
  )

  const handleClick = useCallback(() => {
    setDialogEditOpen(true)
  }, [])

  if (AnswerStatus === 'Withdrawn') return null

  if (AnswerStatus === 'Posted')
    return (
      <>
        <Button variant={'outlined'} onClick={handleClick}>
          Edit Answer
        </Button>
        <AnswerDialog
          open={dialogEditOpen}
          // QuestionID
          // Id
          // Question
          // Answer
          // AnswerId
          // UUID
          isUpdate={true}
          closeAnswerDialog={closeAnswerDialog}
          listName={listName}
          {...row.original}
        />
      </>
    )

  return (
    <>
      <Select
        id={'AssigneeSelect'}
        variant={'outlined'}
        value={value}
        onChange={handleChange}>
        {AnswerStatus === 'Under Review' ? (
          <MenuItem key={`AssigneeSelect_option_post`} value={'post'}>
            Post Answer
          </MenuItem>
        ) : null}
        {AssigneeOptions.map((option, index) => {
          return (
            <MenuItem key={`AssigneeSelect_option_${index}`} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>
      <AnswerDialog
        open={dialogOpen}
        listName={listName}
        closeAnswerDialog={closeAnswerDialog}
        {...row.original}
      />
    </>
  )
}
