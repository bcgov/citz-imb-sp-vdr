import React, { useContext, useState, useEffect } from 'react'
import * as yup from 'yup'
import {
	ConfigContext,
	useList,
	AnswerCell,
	SPList,
	PublicQuestionsContext,
	useLogAction,
	FormikDialog,
	ProponentsContext,
} from 'Components'
import { TimerOutlined } from '@material-ui/icons'

export const AnswerDialog = (props) => {
	const {
		open: openAnswerDialog,
		QuestionID,
		Id,
		Title,
		Answer,
		AnswerId,
		UUID,
		isUpdate = false,
		closeAnswerDialog,
	} = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })

	const proponents = useContext(ProponentsContext)
	const publicQuestions = useContext(PublicQuestionsContext)
	const config = useContext(ConfigContext)
	const logAction = useLogAction()
	const proponentQuestions = useList(`${UUID}_Questions`)

	const getOptions = () => {
		const options = publicQuestions.items.map((item) => {
			return { key: `${item.Question} >> ${item.Answer}`, value: item.Id }
		})

		return options
	}

	const schema = yup.object().shape({
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
	})

	useEffect(() => {
		if (!publicQuestions.isLoading) {
			let _answer = ''

			if (Answer) {
				_answer = publicQuestions.getItemById(parseInt(Answer)).Answer
			}

			setDialogOptions({
				open: openAnswerDialog,
				close: closeAnswerDialog,
				title: `Question ${QuestionID}`,
				instructions: `Update the Sanitized Question if necessary and enter an Answer
                or select a previously answered question`,
				validationSchema: schema,
				fields: [
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
						initialValue: Title,
						control: 'input',
						readOnly: true,
						// validationSchema: yup.string().required('Required'),
					},
					{
						name: 'sanitizedQuestion',
						label: 'Sanitized Question',
						initialValue: Title,
						control: 'input',
						// required: true,
						// validationSchema: yup.string().required('Required'),
					},
					{
						name: 'answer',
						label: 'Answer',
						initialValue: _answer,
						control: 'input',
						// required: true,
						// validationSchema: yup.string().required('Required'),
					},
					{
						name: 'previousAnswer',
						label: 'Select an already Answered Question',
						initialValue: '',
						control: 'select',
						options: getOptions(),
						// validationSchema: yup.string(),
					},
				],
				onSubmit: onSubmit,
			})
		}
		return () => {}
	}, [publicQuestions.isLoading, openAnswerDialog])

	const onSubmit = async (values, { setSubmitting }) => {
		let questionsItem, subject, body

		if (values.previousAnswer) {
			questionsItem = [{ Id: values.previousAnswer }]
		} else {
			if (isUpdate) {
				//! may break if changed to selected previous answer
				questionsItem = await publicQuestions.updateItem({
					Id: AnswerId,
					Question: values.sanitizedQuestion,
					Answer: values.answer,
				})

				subject = config.items.updatedAnswerEmail.TextValue
				body = config.items.updatedAnswerEmail.MultiTextValue
			} else {
				questionsItem = await publicQuestions.addItem({
					Question: values.sanitizedQuestion,
					Answer: values.answer,
				})

				await proponentQuestions.updateItem({
					Id: values.Id,
					Answer: questionsItem[0].Id.toString(),
					AnswerStatus: 'Posted',
				})

				subject = config.items.newAnswerEmail.TextValue
				body = config.items.newAnswerEmail.MultiTextValue
			}
			await proponents.sendEmailToProponents({
				subject,
				body,
			})
		}

		setSubmitting(false)
		closeAnswerDialog()
	}

	return <FormikDialog {...dialogOptions} />
}
