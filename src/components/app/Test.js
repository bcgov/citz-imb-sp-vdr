import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import { PeoplePicker } from 'Components'

export const Test = () => {
	const [userInfo, setUserInfo] = useState([])

	useEffect(() => {
		console.log('userInfo :>> ', userInfo)
		return () => {}
	}, [userInfo])

	return (
		<PeoplePicker
			label='People I want to Add'
			variant={'outlined'}
			getUserInfo={(users) => {
				setUserInfo(users)
			}}
			multiple={false}
		/>
	)
}
