import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import {
  useCurrentUser,
  useEmail,
  useList,
  useLogAction,
} from 'components/Hooks'
import { FormikDialog } from 'components/Reusable'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'

export const AskQuestion = (props) => {
  const { listName } = props

  const questionList = useList(listName)
  const currentUser = useCurrentUser()
  const { sendEmailToCurrentProponentMembers, sendEmailToSiteContact } =
    useEmail()
  const logAction = useLogAction()

  const [formOpen, setFormOpen] = useState(false)

  const fields = [
    {
      name: 'Question',
      label: 'Question',
      initialValue: '',
      validationSchema: Yup.string().required('Required').min(5),
      required: true,
      control: 'textarea',
    },
  ]

  const handleClick = useCallback(() => {
    setFormOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setFormOpen(false)
  }, [])

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      let latestItem = { Id: 0 }
      let nextQuestionNumber

      if (questionList.items.length > 0) {
        for (let i = 0; i < questionList.items.length; i++) {
          if (questionList.items[i].Id > latestItem.Id)
            latestItem = questionList.items[i]
        }

        nextQuestionNumber = parseInt(latestItem.QuestionID.slice(-3)) + 1
      } else {
        nextQuestionNumber = 1
      }

      const nextQuestionNumberString = nextQuestionNumber.toString()

      values.QuestionID = `${
        currentUser.proponent
      }-${nextQuestionNumberString.padStart(3, '0')}`
      values.AuthorId = currentUser.id
      try {
        await questionList.add(values)
        logAction(`successfully asked ${values.Question.substring(0, 100)}`)

        try {
          await sendEmailToCurrentProponentMembers('addQuestionEmail', {
            currentUser,
          })
          await sendEmailToSiteContact('newQuestionEmail', {
            proponentId: currentUser.proponent,
          })
        } catch (error) {
          console.error('error sending emails', error)
        }
      } catch (error) {
        console.error('error submitting question', error)
        logAction(`failed to submit ${values.Question.substring(0, 100)}`, {
          variant: 'error',
        })
      }
      setSubmitting(false)
      handleClose()
    },
    [
      currentUser,
      handleClose,
      logAction,
      questionList,
      sendEmailToCurrentProponentMembers,
      sendEmailToSiteContact,
    ]
  )

  return (
    <>
      <Button
        color={'secondary'}
        onClick={handleClick}
        endIcon={<PublishIcon />}>
        Submit a questions
      </Button>
      <FormikDialog
        open={formOpen}
        close={handleClose}
        fields={fields}
        onSubmit={onSubmit}
        title={'Ask a Question'}
      />
    </>
  )
}
