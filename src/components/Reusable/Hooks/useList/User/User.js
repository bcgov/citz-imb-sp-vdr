import React, { useState, useEffect } from 'react'
import { GetUser } from 'citz-imb-sp-utilities'
import { LinearProgress } from '@material-ui/core'

export const User = ({ userId }) => {
	const [user, setUser] = useState()

	const getUser = async () => {
		const _user = await GetUser({ userId })
		setUser(_user)
	}

	useEffect(() => {
		getUser()
		return () => {}
	}, [])

	return (user ? user.Title : <LinearProgress />)
}
