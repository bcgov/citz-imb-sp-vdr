import React, { useRef } from 'react'
import { Questions } from '../ProponentManagementTab/Questions/Questions'
import { useUser } from 'components'

export const Test = () => {
	console.log('Test')

	const user = useUser(6)

	console.log('user :>> ', user);

	if(user.isLoading) return <div>loading...</div>

	return <div>Hello There</div>
}
