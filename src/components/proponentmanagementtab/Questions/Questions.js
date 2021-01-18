import React, { Fragment, useEffect, useState, useContext } from 'react'
import {
	FormikDialog,
	useList,
	AnswerCell,
	UserContext,
	useLogAction
} from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Assignee } from './Assignee/Assignee'
import * as Yup from 'yup'
import {ProponentsContext} from '../ProponentManagementTab'
import {ConfigContext} from 'Components'

/*

1. Proponent Submits Question => VICO Manager :: Received
2. VICO Manager assigns work => Business SME || Procurement Branch || Legal :: Under Review
3. VICO Manager Posts Answer => null :: Posted

Proponent may withdraw question prior to step 3 => null :: Withdrawn

*/

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [proponent, setProponent] = useState()
	const [proponentGroupId, setProponentGroupId] = useState()
	const [proponentTitle, setProponentTitle] = useState()

	const {
		changeView,
		isLoading: proponentQuestionListIsLoading,
		getRender,
		updateItem,
	} = useList(`${UUID}_Questions`)

	const {
		items: AnswerItems,
		addItem: questionsAddItem,
		updateItem: questionsUpdateItem,
		SelectColumnFilter,
	} = useList('Questions')

	const logAction = useLogAction()

	const currentUser = useContext(UserContext)

	const {
		getProponent,
		isLoading: proponentsIsLoading,
		sendEmailToProponents,
	} = useContext(ProponentsContext)

	const config = useContext(ConfigContext)

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

		await sendEmailToProponents({subject: config.items.newAnswerEmail.TextValue, body: config.items.newAnswerEmail.MultiTextValue })

		console.log('values :>> ', values);
		logAction(`answered question ${values.questionId}`)

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
		columnFiltering: true,
		showTitle: false,
		customColumns: [
			{
				Filter: SelectColumnFilter,
				accessor: 'AnswerStatus',
				Header: 'Status / Answer',
				Cell: ({ value, row }) => {
					return (
						<AnswerCell
							row={row}
							setDialogOptions={setDialogOptions}
							value={value}
						/>
					)
				},
			},
			{
				Filter: SelectColumnFilter,
				accessor: 'Assignee',
				Cell: ({ value, row }) => {
					return row.original.AnswerStatus === 'Withdrawn' ? null : (
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
		// console.log('proponentsIsLoading useEffect', proponentsIsLoading)
		if (!proponentsIsLoading) {
			const _proponent = getProponent(currentUser.proponent)
			// console.log('_proponent', _proponent.GroupId, _proponent)
			setProponentGroupId(_proponent.GroupId)
			setProponentTitle(_proponent.Title)
		}
		return () => {}
	}, [proponentsIsLoading])

	useEffect(() => {
		// console.log('proponent useEffect :>> ', proponent)
		return () => {}
	}, [proponent])

	useEffect(() => {
		if (!proponentQuestionListIsLoading) changeView('VICO_Manager')

		return () => {}
	}, [proponentQuestionListIsLoading])

	return (
		<Fragment>
			{proponentQuestionListIsLoading ? (
				<LinearProgress />
			) : (
				getRender(listOptions)
			)}
			<FormikDialog {...dialogOptions} />
		</Fragment>
	)
}
