import React, { Fragment, useState } from 'react'
import { Select, Button, MenuItem } from '@material-ui/core'

const AssigneeOptions = [
	'VICO Manager',
	'Business SME',
	'Legal',
	'Procurement Branch',
	'Procurement Governance',
]

export const Assignee = (props) => {
	const { assignedTo, status, questionId, id, updateItem } = props

	const handleChange = async (event) => {
		if (event.target.value === 'Posted') {
			console.log('POSTED: event.target.value :>> ', event.target.value)
		} else {
			console.log('event.target.value :>> ', event.target.value)
			await updateItem({
				Id: id,
				AnswerStatus: 'Under Review',
				Assignee: event.target.value,
			})
		}
	}

	const handleClick = (questionId) => {
		console.log('questionId :>> ', questionId)
	}

	return assignedTo === 'Posted' ? (
		<Button variant={'outlined'} onClick={() => handleClick(questionId)}>
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
