import React from 'react'
import { SPDialog, SPTable } from 'Components'

export const ProponentQuestionDialog = ({
	proponentName,
	open,
	listName,
	closeDialog,
}) => {
	return (
		<SPDialog
			open={open}
			title={proponentName}
			showSave={false}
			cancelButtonText={'Close'}
			cancelButtonAction={closeDialog}
			fullScreen={true}>
			<SPTable
				listName={listName}
				tableTitle={'Questions'}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermissions={false}
			/>
		</SPDialog>
	)
}
