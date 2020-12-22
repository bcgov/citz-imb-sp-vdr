import React, { Fragment, useEffect, useState } from 'react'
import { FormikDialog, useList } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Assignee } from './Assignee/Assignee'
import { Answer } from './Answer/Answer'
import * as Yup from 'yup'

/*

1. Proponent Submits Question => VICO Manager :: Received
2. VICO Manager assigns work => Business SME || Procurement Branch || Legal :: Under Review
3. VICO Manager Posts Answer => null :: Posted

Proponent may withdraw question prior to step 3 => null :: Withdrawn

*/

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })

	const { changeView, isLoading, getRender, updateItem } = useList(
		`${UUID}_Questions`
	)

	const {
		items: AnswerItems,
		addItem: questionsAddItem,
		updateItem: questionsUpdateItem,
	} = useList('Questions')

	const onNewSubmit = async (values, { setSubmitting }) => {
		const questionsItem = await questionsAddItem({
			Question: values.sanitizedQuestion,
			Answer: values.answer,
		})

		await updateItem({
			Id: values.id,
			Answer: questionsItem[0].Id.toString(),
			AnswerStatus: 'Posted',
		})

		setSubmitting(false)
		setDialogOptions({ open: false })
	}

	const onUpdateSubmit = async (values, { setSubmitting }) => {
		await questionsUpdateItem({
			Id: values.id,
			Question: values.sanitizedQuestion,
			Answer: values.answer,
		})

		setSubmitting(false)
		setDialogOptions({ open: false })
	}

	const postAnswer = (props) => {
		const { questionId, id, question } = props
		setDialogOptions({
			open: true,
			close: () => setDialogOptions({ open: false }),
			title: `Question ${questionId}`,
			instructions:
				'Update the Sanitized Question if necessary and enter an Answer',
			fields: [
				{
					name: 'id',
					initialValue: id,
					control: 'hidden',
				},
				{
					name: 'question',
					label: 'Original Question',
					initialValue: question,
					control: 'input',
					readOnly: true,
				},
				{
					name: 'sanitizedQuestion',
					label: 'Sanitized Question',
					initialValue: question,
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
				{
					name: 'answer',
					label: 'Answer',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
			],
			onSubmit: onNewSubmit,
		})
	}

	const updateAnswer = (props) => {
		alert('edit not yet functional')
		console.log('updateAnswer props :>> ', props)
		return false
		const { questionId, id, question } = props
		setDialogOptions({
			open: true,
			close: () => setDialogOptions({ open: false }),
			title: `Question ${questionId}`,
			instructions:
				'Update the Sanitized Question if necessary and enter an Answer',
			fields: [
				{
					name: 'id',
					initialValue: id,
					control: 'hidden',
				},
				{
					name: 'question',
					label: 'Original Question',
					initialValue: question,
					control: 'input',
					readOnly: true,
				},
				{
					name: 'sanitizedQuestion',
					label: 'Sanitized Question',
					initialValue: question,
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
				{
					name: 'answer',
					label: 'Answer',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
			],
			onSubmit: onUpdateSubmit,
		})
	}

	const listOptions = {
		columnFiltering: false,
		showTitle: false,
		customColumns: [
			{
				accessor: 'Answer',
				Cell: ({ value, row }) => {
					return value ? (
						<Answer questionId={value} />
					) : (
						row.original.AnswerStatus
					)
				},
			},
			{
				accessor: 'Assignee',
				Cell: ({ value, row }) => {
					return (
						<Assignee
							assignedTo={value}
							status={row.original.AnswerStatus}
							questionId={row.original.QuestionID}
							question={row.original.Title}
							id={row.original.Id}
							updateItem={updateItem}
							updateAnswer={updateAnswer}
							postAnswer={postAnswer}
						/>
					)
				},
			},
		],
	}

	useEffect(() => {
		if (!isLoading) changeView('VICO_Manager')
		return () => {}
	}, [isLoading])

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : getRender(listOptions)}
			<FormikDialog {...dialogOptions} />
		</Fragment>
	)
}
