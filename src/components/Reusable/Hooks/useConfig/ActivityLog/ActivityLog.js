import { SPList } from 'components/SharePoint'
import { FormikDialog } from 'components'
import React, { useMemo, useState } from 'react'
import HistoryIcon from '@material-ui/icons/History'
import { Button } from '@material-ui/core'

export const ActivityLog = () => {
	const [formOpen, setFormOpen] = useState(false)

	const initialState = useMemo(() => {
		return { sortBy: [{ id: 'Modified', desc: true }], pageSize: 50 }
	}, [])

	const handleClick = () => {
		setFormOpen(true)
	}

	return (
		<>
			<Button color='secondary' onClick={handleClick} endIcon={<HistoryIcon />}>
				View Activity Log
			</Button>
			<FormikDialog
				open={formOpen}
				close={() => setFormOpen(false)}
				title='Activity Log'
				dialogActionsTop={true}
				maxWidth={'lg'}>
				<SPList listName={'ActivityLog'} initialState={initialState} />
			</FormikDialog>
		</>
	)
}
