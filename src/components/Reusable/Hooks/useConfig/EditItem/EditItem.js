import React, { useState, useMemo } from 'react'
import { Edit } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { FormikDialog } from 'components'
import { getDialogFields } from './getDialogFields/getDialogFields'

export const EditItem = ({ row }) => {
	const [formOpen, setFormOpen] = useState(false)

	const fields = useMemo(() => getDialogFields(row.original), [row])

	const handleSubmit = (values, { setSubmitting }) => {
		console.log('props :>> ', values, { setSubmitting })

		// values.Id = items[action].Id
		// 					handleSave(action, values, setSubmitting)
	}

	return (
		<>
			<IconButton onClick={() => setFormOpen(true)}>
				<Edit />
			</IconButton>
			<FormikDialog
				fields={fields}
				onSubmit={handleSubmit}
				open={formOpen}
				close={() => setFormOpen(false)}
				title={row.original.Title}
				// children
				instructions={row.original.Instructions}
				// dialogContent
				// submitButtonText='Submit'
				// cancelButtonText='Cancel'
			/>
		</>
	)
}
