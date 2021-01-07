import React, { useMemo } from 'react'
import { List, ListItem, Chip, Button, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useList } from 'Components'

export const AnswerCell = (props) => {
	console.log('AnswerCell props :>> ', props)
	const { row, setDialogOptions, withdrawQuestion, value } = props

	const { getItemById, isLoading: listIsLoading } = useList(`Questions`)

	const memoizedRender = useMemo(() => {
		let render = <LinearProgress />

		if (value === 'Posted') {
			if (!listIsLoading) {

				const item = getItemById(parseInt(row.original.Answer))
				console.log('item :>> ', item);
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
			// if (row.original.Withdrawn) {
			render = <Chip label={value} size={'small'} />
		} else {
			render = <Chip label={value} size={'small'} color={'secondary'} />
		// } else if (withdrawQuestion) {
			// console.log('withdrawQuestion')
			// 	render = (
			// 		<List dense={true}>
			// 			<ListItem disableGutters={true} divider={true}>
			// 				<Chip
			// 					label={row.original.AnswerStatus}
			// 					size={'small'}
			// 					color={'secondary'}
			// 				/>
			// 			</ListItem>
			// 			<ListItem disableGutters={true}>
			// 				<Button
			// 					color={'primary'}
			// 					size={'small'}
			// 					variant={'contained'}
			// 					onClick={() => {
			// 						setDialogOptions({
			// 							open: true,
			// 							close: () => {
			// 								setDialogOptions({
			// 									open: false,
			// 								})
			// 							},
			// 							onSubmit: async (
			// 								values,
			// 								{ setSubmitting }
			// 							) => {
			// 								await withdrawQuestion(row.original)
			// 								setSubmitting(false)
			// 								setDialogOptions({
			// 									open: false,
			// 								})
			// 							},
			// 							title: 'Withdraw Question?',
			// 							instructions:
			// 								'Once withdrawn, the answer process will be stopped.  To start it again, you will need to submit a new question.',
			// 						})
			// 					}}>
			// 					Withdraw
			// 				</Button>
			// 			</ListItem>
			// 		</List>
			// 	)
			// } else {
			// 	render = (
			// 		<Chip
			// 			label={row.original.AnswerStatus}
			// 			size={'small'}
			// 			color={'secondary'}
			// 		/>
			// 	)
			// }
		}

		return render
	}, [listIsLoading])

	return memoizedRender
}
