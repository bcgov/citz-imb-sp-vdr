import React from 'react'
import { List, ListItem, Chip, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useList } from 'components'
import { WithdrawQuestion } from './WithdrawQuestion/WithdrawQuestion'

export const AnswerCell = (props) => {
	const { row, value, proponentQuestionsListName, showWithdrawButton = false } = props

	const publicQuestions = useList({ listName: 'Questions' })

	if (value === 'Withdrawn') return <Chip label={value} size={'small'} />

	if (value === 'Posted') {
		if (publicQuestions.isLoading) return <LinearProgress />

		const item = publicQuestions.items.filter(
			(item) => item.Id === parseInt(row.original.Answer)
		)[0]
		const isSanitized = row.values.Title !== item.Question

		return (
			<List dense={true}>
				{isSanitized ? (
					<ListItem disableGutters={true} divider={true}>
						<Alert
							severity={'warning'}
							variant={'outlined'}
							icon={false}>
							<AlertTitle>Published Question</AlertTitle>
							{item.Question}
						</Alert>
					</ListItem>
				) : null}
				<ListItem disableGutters={true}>
					<Alert
						severity={'success'}
						variant={'outlined'}
						icon={false}>
						<AlertTitle>Answer</AlertTitle>
						{item.Answer}
					</Alert>
				</ListItem>
			</List>
		)
	}

	if (showWithdrawButton)
		return (
			<List dense={true}>
				<ListItem disableGutters={true} divider={true}>
					<Chip label={value} size={'small'} color={'secondary'} />
				</ListItem>
				<ListItem disableGutters={true}>
					<WithdrawQuestion value={value} row={row} listName={proponentQuestionsListName} />
				</ListItem>
			</List>
		)

	return <Chip label={value} size={'small'} color={'secondary'} />
}
