import React, { Fragment, useState } from 'react'
import { SPList, SPDialog, SPGroup } from '../../sharepoint/SP'
import { ToggleProponent } from './ToggleProponent'
import { TextField } from '@material-ui/core'
import { AddProponent } from './AddProponent'
import PeopleIcon from '@material-ui/icons/People'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'

export const ProponentManagement = () => {
	let proponentNameInput = ''
	const proponentListName = 'Proponents'

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
	}

	const [dialogParameters, setDialogParameters] = useState({ open: false })
	const [isDirty, setIsDirty] = useState(true)

	const handleDirty = (newDirty) => {
		setIsDirty(newDirty)
	}

	const customActions = [
		(rowData) => {
			return {
				//manage proponent library
				icon: () => {
					return <LibraryBooksIcon color={'primary'} />
				},
				tooltip: 'Open Proponent Library',
				onClick: (event, rowdata) => {
					setDialogParameters({
						open: true,
						title: `${rowdata.Title} - ${rowdata.UUID}`,
						content: (
							<SPList
								listName={rowdata.UUID}
								addItem={false}
								deleteItem={false}
								editItem={false}
								changeItemPermission={false}
								options={options}
							/>
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
		(rowData) => {
			return {
				//manage proponent questions
				icon: () => <QuestionAnswerIcon color={'primary'} />,
				tooltip: 'Open Proponent Questions',
				onClick: (event, rowdata) => {
					setDialogParameters({
						open: true,
						title: `${rowdata.Title} - ${rowdata.UUID}`,
						content: (
							<SPList
								listName={`${rowdata.UUID}_Questions`}
								addItem={false}
								deleteItem={false}
								editItem={false}
								changeItemPermission={false}
								options={options}
							/>
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
		(rowData) => {
			if (rowData.Active) {
				return {
					//manage proponent users
					icon: () => <PeopleIcon color={'primary'} />,
					tooltip: 'Manage User Accounts',
					onClick: (event, rowdata) => {
						setDialogParameters({
							open: true,
							title: `${rowdata.Title} - ${rowdata.UUID}`,
							content: (
								<SPGroup
									groupId={rowdata.GroupId}
									addUser={true}
									removeUser={true}
									editGroup={false}
									options={options}
								/>
							),
							showSave: false,
							cancelButtonText: 'Close',
							cancelButtonAction: () => {
								setDialogParameters({ open: false })
							},
						})
					},
				}
			} else {
				return {
					icon: PeopleIcon,
					disabled: true,
				}
			}
		},
		(rowdata) => ({
			//Activate / inactivate proponent
			icon: rowdata.Active
				? () => <ToggleOnIcon color={'primary'} />
				: () => <ToggleOffIcon color={'error'} />,
			tooltip: 'Toggle Proponent Active / Inactive',
			onClick: (event, rowdata) => {
				const callBack = () => {
					setDialogParameters({ open: false })
					setIsDirty(true)
				}
				setDialogParameters({
					open: true,
					title: `${rowdata.Title} - ${rowdata.UUID}`,
					content: rowdata.Active
						? 'Proponent Group will be deleted; member users will no-longer be able to access the site.'
						: 'A new group will be created for the proponent. You will need to manually add users.',
					saveButtonText: rowdata.Active
						? 'Set Inactive'
						: 'Set Active',
					saveButtonAction: () => {
						ToggleProponent(proponentListName, rowdata, callBack)
					},
					cancelButtonAction: () => {
						setDialogParameters({ open: false })
					},
				})
			},
		}),
	]

	return (
		<Fragment>
			<SPList
				listName={proponentListName}
				addItem={true}
				addOptions={{
					title: 'Add Proponent',
					content: (
						<TextField
							autoFocus
							margin='dense'
							id='proponentName'
							label="Proponent's Name"
							type='text'
							fullWidth
							onChange={(e) => {
								proponentNameInput = e.target.value
							}}
						/>
					),
					saveButtonText: 'Submit',
					saveAction: () => {
						AddProponent(proponentNameInput)
							.then((response) => {
								setIsDirty(true)
							})
							.catch((err) => {
								console.log('add proponent error', err)
							})
					},
					cancelButtonText: 'Cancel',
					cancelAction: () => {
						console.log(`${proponentNameInput} cancelled`)
					},
				}}
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
