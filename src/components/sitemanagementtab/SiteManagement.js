import React, { useState, Fragment } from 'react'
import { SPList, SPDialog, icons } from 'Components'
import { DialogContentText, TextField } from '@material-ui/core'
import MUIRichTextEditor from 'mui-rte'

export const SiteManagement = () => {
	const listName = 'Config'

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		//actionsColumnIndex: -1,
	}

	const customActions = [
		(rowData) => {
			return {
				//edit row
				icon: icons.Edit,
				tooltip: 'Edit Values',
				onClick: (event, rowdata) => {
					setDialogParameters({
						open: true,
						title: rowdata.Key,
						content: (
							<DialogContentText>
								<div
									dangerouslySetInnerHTML={{
										__html: rowdata.Instructions,
									}}
								/>
								<TextField
									id='TextValue'
									label='TextValue'
									value={rowdata.TextValue}
									fullWidth={true}
									autoFocus={true}
									margin='normal'
								/>
								<MUIRichTextEditor
									label='MultiTextValue'
									value={rowdata.MultiTextValue}
									fullWidth={true}
									multiline={true}
									margin='normal'
								/>
								<TextField
									id='NumberValue'
									label='NumberValue'
									value={rowdata.NumberValue}
									fullWidth={true}
									margin='normal'
								/>
								<TextField
									id='YesNoValue'
									label='YesNoValue'
									value={rowdata.YesNoValue}
									fullWidth={true}
									margin='normal'
								/>
								<TextField
									id='GroupValueId'
									label='GroupValue'
									value={rowdata.GroupValueId}
									fullWidth={true}
									margin='normal'
								/>
							</DialogContentText>
						),
						showSave: false,
						cancelButtonText: 'Close',
						cancelButtonAction: () => {
							setDialogParameters({ open: false })
						},
					})
				},
			}
		},
	]

	const [isDirty, setIsDirty] = useState(true)
	const [dialogParameters, setDialogParameters] = useState({ open: false })

	const handleDirty = (newDirty) => {
		setIsDirty(newDirty)
	}

	return (
		<Fragment>
			<SPList
				listName={listName}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermission={false}
				customActions={customActions}
				options={options}
				isDirty={isDirty}
				handleDirty={handleDirty}
			/>
			<SPDialog {...dialogParameters} />
		</Fragment>
	)
}
