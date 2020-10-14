import React from 'react'
import Button from '@material-ui/core/Button'
import { SendQuestionNotificationEmail } from 'Components'

export const Test = () => {

	const clickHandler = async () => {
		SendQuestionNotificationEmail()
	}

		return (
		<Button variant='contained' color='primary' onClick={clickHandler}>
			Send Email
		</Button>
	)
}
