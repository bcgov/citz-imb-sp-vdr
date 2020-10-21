import React, { useState, useEffect } from 'react'

import { SPDialog, AnswerQuestion } from 'Components'
import { DialogContentText, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const AnswerQuestionDialog = ({
	open,
	close,
	listName,
	questionId,
	question,
}) => {

	const [validationAlert, setValidationAlert] = useState(false)
	const [sanitizedQuestion, setSanitizedQuestion] = useState(question)
	const [answer, setAnswer] = useState('')

	const onChangeQuestion = (event) => {
		setSanitizedQuestion(event.target.value)
	}

	const onChangeAnswer = (event) => {
		setAnswer(event.target.value)
	}

	const saveAnswerAction = async () => {
		if (answer.length > 0 && sanitizedQuestion.length > 0) {
			await AnswerQuestion(
				sanitizedQuestion,
				answer,
				listName,
				questionId
			)

			close()
		} else {
			setValidationAlert(true)
		}
	}

	useEffect(() => {
		console.log('sanitizedQuestion :>> ', sanitizedQuestion);
		return () => {}
	}, [sanitizedQuestion])

	return (
		<SPDialog
			open={open}
			title={'Answer Question'}
			saveButtonAction={saveAnswerAction}
			cancelButtonAction={close}>
			<DialogContentText>
				{validationAlert ? (
					<Alert severity='error'>
						Both Sanitized Question and Answer must be more than 0
						characters
					</Alert>
				) : null}
				<Alert severity='info'>{question}</Alert>
			</DialogContentText>
			<TextField
				id='question'
				label={'Sanitized Question'}
				onChange={onChangeQuestion}
				defaultValue={question}
				margin={'normal'}
				fullWidth={true}
				multiline={true}
				rows={3}
				variant={'outlined'}
				required={true}
			/>
			<TextField
				id='answer'
				label={'Answer'}
				onChange={onChangeAnswer}
				margin={'normal'}
				fullWidth={true}
				multiline={true}
				rows={3}
				variant={'outlined'}
				required={true}
			/>
		</SPDialog>
	)
}
