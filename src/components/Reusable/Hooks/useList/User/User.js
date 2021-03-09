import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { useUser } from 'components'

export const User = ({ userId }) => {
	const user = useUser(userId)

	if (user.isLoading) return <LinearProgress />

	return <>{user.Title}</>
}
