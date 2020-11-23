import React, { useState, useEffect, Fragment } from 'react'

import { ProponentGroupDialog } from 'Components'

export const Test = () => {
	const dialogOptions = {
		open: true,
		close: () => {
			//setDialogOptions({ open: false })
		},
		title: `proponent Membership`,
		dialogContent: 'hello',
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(false)
			//setDialogOptions({ open: false })
		},
	}

	return <ProponentGroupDialog {...dialogOptions} />
}
