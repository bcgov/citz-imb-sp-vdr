import React, { useState, useEffect, Fragment } from 'react'
import { SPDialog, GetQuestionAndAnswer } from 'Components'
import { Divider } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export const ViewAnswerDialog = ({ open, closeDialog, itemId, listName }) => {
	const [originalQuestion, setOriginalQuestion] = useState()
	const [sanitizedQuestion, setSanitizedQuestion] = useState()
	const [isSanitized, setIsSanitized] = useState(false)
	const [answer, setAnswer] = useState()

	const cancelAction = () => {
		closeDialog()
	}

	const getAnswer = async () => {
		const questionAnswer = await GetQuestionAndAnswer(listName, itemId)

		setOriginalQuestion(questionAnswer.originalQuestion)
		setSanitizedQuestion(questionAnswer.sanitizedQuestion)
		setIsSanitized(
			questionAnswer.originalQuestion !== questionAnswer.sanitizedQuestion
		)
		setAnswer(questionAnswer.answer)
	}

	useEffect(() => {
		if (open) {
			getAnswer()
		} else {
			setOriginalQuestion(null)
			setSanitizedQuestion(null)
			setAnswer(null)
		}
		return () => {}
	}, [open])

	return (
		<SPDialog
			open={open}
			title={'View Answer'}
			showSave={false}
			cancelButtonAction={cancelAction}
			cancelButtonText={'Close'}>
			<Alert icon={false} variant='outlined' severity='info'>
				<AlertTitle>{isSanitized ? 'Original Question' : 'Question'}</AlertTitle>
				<Divider />
				{originalQuestion}
			</Alert>
			<Divider />
			{isSanitized ? (
				<Fragment>
					<Alert icon={false} variant='outlined' severity='warning'>
						<AlertTitle>Sanitized Question</AlertTitle>
						<Divider />
						{sanitizedQuestion}
					</Alert>
					<Divider />
				</Fragment>
			) : null}
			<Alert icon={false} variant='outlined' severity='success'>
				<AlertTitle>Answer</AlertTitle>
				<Divider />
				{answer}
			</Alert>
		</SPDialog>
	)
}
