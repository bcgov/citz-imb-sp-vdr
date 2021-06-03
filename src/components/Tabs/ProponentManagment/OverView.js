import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog } from 'components/Reusable'
import { useList, useLogAction } from 'components/Hooks'
import React, { useState } from 'react'

export const OverView = (props) => {
  const { Active, Title, UUID, setProponentActive, setProponentInactive } =
    props

  const [dialogOptions, setDialogOptions] = useState({ open: false })

  const logAction = useLogAction()
  const proponentQuestions = useList(`${UUID}_Questions`)
  const proponentLibrary = useList(UUID)

  const questionsAsked = proponentQuestions.items.length
  const questionsAnswered = proponentQuestions.items.filter(
    (item) => item.Answer !== null
  ).length
  const questionsWithdrawn = proponentQuestions.items.filter(
    (item) => item.Withdrawn
  ).length
  const documentCount = proponentLibrary.items.length

  const questionsUnanswered =
    questionsAsked - questionsAnswered - questionsWithdrawn

  const handleToggle = (event) => {
    setDialogOptions({
      open: true,
      close: () => {
        setDialogOptions({ open: false })
      },
      title: `Set ${Title} to ${Active ? 'Inactive' : 'Active'}`,
      dialogContent: Active ? (
        <Alert severity={'error'}>
          <AlertTitle>Proponent Group will be deleted</AlertTitle>
          Member users will no-longer be able to access the site.
        </Alert>
      ) : (
        <Alert severity={'info'}>
          <AlertTitle>A new group will be created for the proponent</AlertTitle>
          You will need to manually add users.
        </Alert>
      ),
      onSubmit: async (values, { setSubmitting }) => {
        try {
          if (Active) {
            await setProponentInactive(UUID)
            logAction(`successfully Inactivated ${UUID}`)
          } else {
            await setProponentActive(UUID)
            logAction(`successfully Activated ${UUID}`)
          }
        } catch (error) {
          throw error
        }
        setSubmitting(false)
        setDialogOptions({ open: false })
      },
    })
  }

  return (
    <>
      <List>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>Unique Id</ListItemText>
          <ListItemSecondaryAction>{UUID}</ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-active'>
            {Active ? 'Active' : 'Inactive'}
          </ListItemText>
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              onChange={handleToggle}
              checked={Active}
              inputProps={{
                'aria-labelledby': 'overview-list-label-active',
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>
            Questions Asked
          </ListItemText>
          <ListItemSecondaryAction>{questionsAsked}</ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>
            Questions Answered
          </ListItemText>
          <ListItemSecondaryAction>{questionsAnswered}</ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>
            Questions Withdrawn
          </ListItemText>
          <ListItemSecondaryAction>
            {questionsWithdrawn}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>
            Questions Unanswered
          </ListItemText>
          <ListItemSecondaryAction>
            {questionsUnanswered > 0 ? (
              <ErrorOutlineIcon fontSize={'small'} color={'primary'} />
            ) : null}
            {questionsUnanswered}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id='overview-list-label-uuid'>
            Documents Submitted
          </ListItemText>
          <ListItemSecondaryAction>{documentCount}</ListItemSecondaryAction>
        </ListItem>
      </List>
      <FormikDialog {...dialogOptions} />
    </>
  )
}
