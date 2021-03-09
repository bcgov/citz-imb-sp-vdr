import React from 'react'
import { Button } from '@material-ui/core'
import { useList, useLogAction } from 'components'

export const WithdrawQuestion = (props) => {
	const { row, handleWithdraw } = props

	const handleClick = () => {
		handleWithdraw(row)
	}

	return (
		<Button
			onClick={handleClick}
			size={'small'}
			variant={'contained'}
			color={'primary'}>
			Withdraw
		</Button>
	)
}
