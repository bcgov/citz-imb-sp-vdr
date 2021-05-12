import { IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { FormikDialog } from 'components'
import React, { useState } from 'react'
import { getDialogFields } from './getDialogFields/getDialogFields'

export const EditItem = ({ row, updateItem }) => {
	const [formOpen, setFormOpen] = useState(false)

	const handleSubmit = async (values, { setSubmitting }) => {
		const item = { ...values, Id: row.original.Id }

		await updateItem(item)

		setSubmitting(false)
		setFormOpen(false)
	}

	return (
		<>
			<IconButton onClick={() => setFormOpen(true)}>
				<Edit />
			</IconButton>
			<FormikDialog
				fields={getDialogFields(row.original)}
				onSubmit={row.values.Key === 'allowSubmissions' ? null : handleSubmit}
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
