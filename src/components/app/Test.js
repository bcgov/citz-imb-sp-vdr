import React from 'react'
import { AnswerDialog } from '../ProponentManagementTab/Questions/AnswerDialog/AnswerDialog'

export const Test = () => {
	const options = {
		openAnswerDialog: true,
		UUID: 'V68C58C',
		questionId: 'V68C58C-002',
		id: 10,
		question: 'Question Number 2',
		setAnswerDialogOptions: () => {},
	}

	return <AnswerDialog {...options} />
}
