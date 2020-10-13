import React from 'react'
import Button from '@material-ui/core/Button'
import { GetCurrentUser } from 'citz-imb-sp-utilities'
import { useAuthentication } from 'Components'

export const Test = () => {

	const getCurrentUser = useAuthentication(GetCurrentUser)

	const clickHandler = async () => {
		const currentUser = await getCurrentUser({})
		console.log('currentUser :>> ', Date(), currentUser)
	}

	return (
		<Button variant='contained' color='primary' onClick={clickHandler}>
			Get Current User
		</Button>
	)
}
