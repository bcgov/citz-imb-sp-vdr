import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import { GetGroupMembers, GetUserByEmail } from 'components/Api'
import {
  useConfig,
  useCurrentUser,
  useList,
  useLogAction,
  useProponents,
} from 'components/Hooks'
import { FormikDialog, SendConfirmationEmail } from 'components/Reusable'
import React, { useState, useMemo, useCallback } from 'react'
import * as Yup from 'yup'

export const AskQuestion = (props) => {
  const { listName } = props

  const questionList = useList(listName)
  const currentUser = useCurrentUser()
  const proponents = useProponents()
  const config = useConfig()
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

  const sendEmails = useCallback(async (proponent) => {

    const addQuestionEmail = config.items.filter(
      (item) => item.Key === 'addQuestionEmail'
    )[0]
    const newQuestionEmail = config.items.filter(
      (item) => item.Key === 'newQuestionEmail'
    )[0]
    const contactEmail = config.items.filter(
      (item) => item.Key === 'contactEmail'
    )[0]

    const groupMembers = await GetGroupMembers({
      groupId: proponent.GroupId,
    })

    for (let i = 0; i < groupMembers.length; i++) {
      await SendConfirmationEmail({
        addresses: groupMembers[i].LoginName,
        proponent: proponent.Title,
        subject: addQuestionEmail.TextValue,
        body: addQuestionEmail.MultiTextValue,
        additionalReplacementPairs: [
          {
            searchvalue: /\[UserName\]/g,
            newvalue: currentUser.name,
          },
          {
            searchvalue: /\[AddresseeName\]/g,
            newvalue: groupMembers[i].Title,
          },
        ],
        contactEmail,
      })
    }
    const contactEmailUser = await GetUserByEmail({
      email: contactEmail.TextValue,
    })

    await SendConfirmationEmail({
      addresses: contactEmailUser[0].LoginName,
      proponent: proponent.Title,
      subject: newQuestionEmail.TextValue,
      body: newQuestionEmail.MultiTextValue,
      contactEmail,
    })
  }, [
    
  ])

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
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

    const proponent = proponents.get(currentUser.proponent)

    try {
      await questionList.add(values)
      await sendEmails(proponent)
      logAction(`successfully asked ${values.Question.substring(0, 100)}`)
    } catch (error) {
      console.error('error submitting question', error)
      logAction(`failed to submit ${values.Question.substring(0, 100)}`, {
        variant: 'error',
      })
    }
    setSubmitting(false)
    handleClose()
  }, [currentUser.id, currentUser.proponent, handleClose, logAction, proponents, questionList, sendEmails])

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
