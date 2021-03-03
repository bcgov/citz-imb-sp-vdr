import React from 'react'
import { Button } from '@material-ui/core'
import { useList, useLogAction } from 'components'

export const WithdrawQuestion = (props) => {
	const { row, listName } = props

	const { updateItem } = useList({ listName })
	const logAction = useLogAction()

	const withdrawQuestion = async () => {
		await updateItem({
			Id: row.original.Id,
			Withdrawn: true,
			AnswerStatus: 'Withdrawn',
			Assignee: '',
		})
		logAction(`successfully withdrew ${row.values.Title}`)
	}

	return (
		<Button
			onClick={withdrawQuestion}
			size={'small'}
			variant={'contained'}
			color={'primary'}>
			Withdraw
		</Button>
	)
}
