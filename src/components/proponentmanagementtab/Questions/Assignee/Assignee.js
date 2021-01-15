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
		assignedTo,
		status,
		questionId,
		id,
		updateItem,
		postAnswer,
		question,
		updateAnswer,
	} = props

	const logAction = useLogAction()

	const handleChange = (event) => {
		if (event.target.value === 'post') {
			postAnswer({ questionId, id, question })
		} else {
			updateItem({
				Id: id,
				AnswerStatus: 'Under Review',
				Assignee: event.target.value,
			})
			logAction(`assigned ${questionId} to ${event.target.value}`)
		}
	}

	const handleClick = () => {
		updateAnswer({ questionId, id, question })
	}

	return status === 'Posted' ? (
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
					disabled={status !== 'Under Review'}
					key={`AssigneeSelect_option_post`}
					value={'post'}>
					Post Answer
				</MenuItem>
			</Select>
		</Fragment>
	)
}
