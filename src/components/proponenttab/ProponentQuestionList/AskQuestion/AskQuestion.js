import React, { useState } from 'react'
import { IconButton, useList } from 'components'
import { FormikDialog, useCurrentUser } from 'components/Reusable'
import * as Yup from 'yup'

export const AskQuestion = (props) => {
	const { listName } = props

	const questionList = useList({ listName })
    const currentUser = useCurrentUser()

	const [formOpen, setFormOpen] = useState(false)

	const fields = [
		{
			name: 'Title',
			label: 'Question',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			required: true,
			control: 'input',
		},
	]

	const handleClick = () => {
		setFormOpen(true)
	}

	const handleClose = () => {
		setFormOpen(false)
	}

	const onSubmit = async (values, { setSubmitting }) => {
		let latestItem = { Id: 0 }
		let nextQuestionNumber

		if (questionList.items.length > 0) {
			for (let i = 0; i < questionList.items.length; i++) {
				if (questionList.items[i].Id > latestItem.Id) latestItem = questionList.items[i]
			}

			nextQuestionNumber = parseInt(latestItem.QuestionID.slice(-3)) + 1
		} else {
			nextQuestionNumber = 1
		}

		const nextQuestionNumberString = nextQuestionNumber.toString()

		values.QuestionID = `${
			currentUser.proponent
		}-${nextQuestionNumberString.padStart(3, '0')}`

		try {
			await questionList.addItem(values)
			// await sendEmails()
			// logAction(`successfully asked ${values.Title}`)
			// refresh()
		} catch (error) {
			console.error('error submitting question', error)
		}
		setSubmitting(false)
		handleClose()
	}

	return (
		<>
			<IconButton type={'add'} onClick={handleClick} />
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
