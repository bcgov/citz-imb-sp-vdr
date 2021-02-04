import React, { Fragment, useState } from 'react'
import { Select, Button, MenuItem } from '@material-ui/core'
import { useLogAction } from 'Components'

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
		updateItem,
		postAnswer,
		updateAnswer,
	} = props

	const { AnswerStatus, QuestionID, Title, Id, Answer } = originalValues

	const logAction = useLogAction()

	const handleChange = (event) => {
		if (event.target.value === 'post') {
			postAnswer({ QuestionID, Id, Title })
		} else {
			updateItem({
				Id: Id,
				AnswerStatus: 'Under Review',
				Assignee: event.target.value,
			})
			logAction(`assigned ${QuestionID} to ${event.target.value}`)
		}
	}

	const handleClick = () => {
		updateAnswer({ QuestionID, Id, Title, Answer })
	}

	return AnswerStatus === 'Posted' ? (
		<Button variant={'outlined'} onClick={handleClick}>
			Edit Answer
		</Button>
	) : (
		<Fragment>
			<Select
				id={'AssigneeSelect'}
				variant={'outlined'}
				value={assignedTo}
				onChange={handleChange}>
				{AssigneeOptions.map((option, index) => {
					return (
						<MenuItem
							key={`AssigneeSelect_option_${index}`}
							value={option}>
							{option}
						</MenuItem>
					)
				})}
				<MenuItem
					disabled={AnswerStatus !== 'Under Review'}
					key={`AssigneeSelect_option_post`}
					value={'post'}>
					Post Answer
				</MenuItem>
			</Select>
		</Fragment>
	)
}
