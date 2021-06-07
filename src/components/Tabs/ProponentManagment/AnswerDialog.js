import { useEmail, useList, useLogAction } from 'components/Hooks'
import { FormikDialog } from 'components/Reusable'
import React, { useCallback, useMemo } from 'react'
import * as yup from 'yup'

export const AnswerDialog = (props) => {
  const {
    open,
    QuestionID,
    Id,
    Question,
    Answer,
    isUpdate = false,
    closeAnswerDialog,
    listName,
  } = props

  const publicQuestions = useList('Questions')
  const logAction = useLogAction()
  const { sendEmailToAllProponents } = useEmail()

  const proponentQuestions = useList(listName)

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      let questionsItem

      try {
        if (values.previousAnswer) {
          questionsItem = [{ Id: values.previousAnswer }]
        } else {
          if (isUpdate) {
            //! may break if changed to selected previous answer
            questionsItem = await publicQuestions.update({
              Id: Answer,
              Question: values.sanitizedQuestion,
              Answer: values.answer,
            })
            await sendEmailToAllProponents('updatedAnswerEmail')
          } else {
            questionsItem = await publicQuestions.add({
              Question: values.sanitizedQuestion,
              Answer: values.answer,
            })
            await proponentQuestions.update({
              Id: values.Id,
              Answer: questionsItem[0].Id.toString(),
              AnswerStatus: 'Posted',
              Assignee: 'Posted Answer',
            })
            logAction(`answered question '${values.sanitizedQuestion}'`)
            await sendEmailToAllProponents('newAnswerEmail')
          }
        }
      } catch (error) {
        console.error(error)
        logAction(`answer question failed '${values.sanitizedQuestion}'`, {
          variant: 'error',
        })
      }

      setSubmitting(false)
      closeAnswerDialog()
    },
    [
      Answer,
      closeAnswerDialog,
      isUpdate,
      logAction,
      proponentQuestions,
      publicQuestions,
      sendEmailToAllProponents,
    ]
  )

  const getOptions = useCallback(() => {
    const options = publicQuestions.items.map((item) => {
      return {
        key: `${item.Question} >> ${item.Answer}`,
        value: item.Id,
      }
    })

    return options
  }, [publicQuestions])

  const schema = useMemo(
    () =>
      yup.object().shape({
        Question: yup.string().required('Required'),
        sanitizedQuestion: yup.string().required('Required'),
        previousAnswer: yup.string(),
        answer: yup.string().when('previousAnswer', {
          is: (previousAnswer) => {
            if (previousAnswer) {
              return false
            } else {
              return true
            }
          },
          then: yup.string().required('Required'),
          otherwise: yup.string(),
        }),
      }),
    []
  )

  // useEffect(() => {
  //   if (!publicQuestions.isLoading) {
  //     let question = ''

  //     if (Answer) {
  //       question = publicQuestions.items.filter(
  //         (item) => item.Id === parseInt(Answer)
  //       )[0]
  //     }

  const fields = useMemo(() => {
    const postedAnswer = publicQuestions.items.filter(
      (item) => item.Id === parseInt(Answer)
    )[0]

    return [
      {
        name: 'Id',
        initialValue: Id,
        control: 'hidden',
      },
      {
        name: 'QuestionID',
        initialValue: QuestionID,
        control: 'hidden',
      },
      {
        name: 'Question',
        label: 'Original Question',
        initialValue: Question,
        control: 'input',
        readOnly: true,
      },
      {
        name: 'sanitizedQuestion',
        label: 'Sanitized Question',
        initialValue: postedAnswer?.Question ?? Question,
        control: 'input',
      },
      {
        name: 'answer',
        label: 'Answer',
        initialValue: postedAnswer?.Answer ?? '',
        control: 'input',
        onChange: () => {
          console.log("I'm changin my answer")
        },
      },
      {
        name: 'previousAnswer',
        label: 'Select an already Answered Question',
        initialValue: '',
        control: 'select',
        options: getOptions(),
        // onChange: ()=>{console.log("I'm changing my selected answer")}
      },
    ]
  }, [Answer, Id, Question, QuestionID, getOptions, publicQuestions])

  return (
    <FormikDialog
      open={open}
      close={closeAnswerDialog}
      title={`Question ${QuestionID}`}
      instructions={`Update the Sanitized Question if necessary and enter an Answer or select a previously answered question`}
      validationSchema={schema}
      fields={fields}
      onSubmit={onSubmit}
    />
  )
}
