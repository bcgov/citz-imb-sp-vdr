import { Button, MenuItem, Select } from '@material-ui/core'
import React from 'react'

const AssigneeOptions = [
	'VICO Manager',
	'Business SME',
	'Legal',
	'Procurement Branch',
	'Procurement Governance',
]

export const Assignee = (props) => {
	const {
		originalValues,
		assignedTo,
		changeAssignee,
		updateAnswer,
	} = props

	const { AnswerStatus, QuestionID, Title, Id, Answer } = originalValues

	const handleChange = (event) => {
		changeAssignee(event.target.value, QuestionID, Id, Title)
	}

	const handleClick = () => {
		updateAnswer({ QuestionID, Id, Title, Answer })
	}

	if (AnswerStatus === 'Posted')
		return (
			<Button variant={'outlined'} onClick={handleClick}>
				Edit Answer
			</Button>
		)

	return (
		<>
			<Select
				id={'AssigneeSelect'}
				variant={'outlined'}
				value={assignedTo}
				onChange={handleChange}>
				{AnswerStatus === 'Under Review' ? (
					<MenuItem key={`AssigneeSelect_option_post`} value={'post'}>
						Post Answer
					</MenuItem>
				) : null}
				{AssigneeOptions.map((option, index) => {
					return (
						<MenuItem
							key={`AssigneeSelect_option_${index}`}
							value={option}>
							{option}
						</MenuItem>
					)
				})}
			</Select>
		</>
	)
}
