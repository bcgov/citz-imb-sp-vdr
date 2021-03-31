import { LinearProgress } from '@material-ui/core'
import { useUser } from 'components'
import React from 'react'

export const User = (userId) => {
	const user = useUser(userId)

	if (user.isLoading) return <LinearProgress />

	return <>{user.Title}</>
}
