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
} from 'Components'
import { ProponentsContext } from '../../ProponentManagementTab'

export const AnswerDialog = (props) => {
	const {
		open: openAnswerDialog,
		questionId,
		id,
		question,
		UUID,
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
		question: yup.string().required('Required'),
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
			setDialogOptions({
				open: openAnswerDialog,
				close: closeAnswerDialog,
				title: `Question ${questionId}`,
				instructions: `Update the Sanitized Question if necessary and enter an Answer
                or select a previously answered question`,
				validationSchema: schema,
				fields: [
					{
						name: 'id',
						initialValue: id,
						control: 'hidden',
					},
					{
						name: 'questionId',
						initialValue: questionId,
						control: 'hidden',
					},
					{
						name: 'question',
						label: 'Original Question',
						initialValue: question,
						control: 'input',
						readOnly: true,
						// validationSchema: yup.string().required('Required'),
					},
					{
						name: 'sanitizedQuestion',
						label: 'Sanitized Question',
						initialValue: question,
						control: 'input',
						// required: true,
						// validationSchema: yup.string().required('Required'),
					},
					{
						name: 'answer',
						label: 'Answer',
						initialValue: '',
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
						validationSchema: yup.string(),
					},
				],
				onSubmit: onSubmit,
			})
		}
		return () => {}
	}, [publicQuestions.isLoading, openAnswerDialog])

	const onSubmit = async (values, { setSubmitting }) => {
		let questionsItem

		if (values.previousAnswer) {
			questionsItem = [{ Id: values.previousAnswer }]
		} else {
			questionsItem = await publicQuestions.addItem({
				Question: values.sanitizedQuestion,
				Answer: values.answer,
			})
		}

		await proponentQuestions.updateItem({
			Id: values.id,
			Answer: questionsItem[0].Id.toString(),
			AnswerStatus: 'Posted',
		})

		await proponents.sendEmailToProponents({
			subject: config.items.newAnswerEmail.TextValue,
			body: config.items.newAnswerEmail.MultiTextValue,
		})

		logAction(`answered question ${values.questionId}`)

		setSubmitting(false)
		closeAnswerDialog()
	}

	return <FormikDialog {...dialogOptions} />
}
