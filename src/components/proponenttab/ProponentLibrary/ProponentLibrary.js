import React from 'react'
import { useCurrentUser } from 'components'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { SPLibrary } from 'components/SharePoint'

export const ProponentLibrary = () => {
	const currentUser = useCurrentUser()

	const listName = currentUser.proponent

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>

	return (
		<SPLibrary
			listName={listName}
			title={'Submitted Documents'}
			allowUpload={true}
		/>
	)
}
