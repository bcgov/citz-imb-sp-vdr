import React, { useMemo } from 'react'
import { List, ListItem, Chip, Button, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useList } from 'Components'

export const AnswerCell = (props) => {
	const { row, value } = props

	const { getItemById, isLoading: listIsLoading } = useList(`Questions`)

	const memoizedRender = useMemo(() => {
		let render = <LinearProgress />

		if (value === 'Posted') {
			if (!listIsLoading) {

				const item = getItemById(parseInt(row.original.Answer))
				const isSanitized = row.values.Title !== item.Question
				render = (
					<List dense={true}>
						<ListItem disableGutters={true} divider={true}>
							<Alert
								severity={isSanitized ? 'warning' : 'info'}
								variant={'outlined'}
								icon={false}>
								<AlertTitle>Published Question</AlertTitle>
								{item.Question}
							</Alert>
						</ListItem>
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
		} else if (value === 'Withdrawn') {
			render = <Chip label={value} size={'small'} />
		} else {
			render = <Chip label={value} size={'small'} color={'secondary'} />
		}

		return render
	}, [listIsLoading])

	return memoizedRender
}
