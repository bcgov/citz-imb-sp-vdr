import React, { Fragment, useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import Badge from '@material-ui/core/Badge'
import PeopleIcon from '@material-ui/icons/People'
import { green, red } from '@material-ui/core/colors'
import {
	SPList,
	LogAction,
	SPDialog,
	ToggleProponent,
	AddProponent,
	SPGroup,
	SendAddUserConfirmationEmail,
	tableOptions,
} from 'Components'
import { GetRoleDefinitions, GetListItems } from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'

export const ProponentManagementTab = () => {
	const proponentListName = 'Proponents'

	const [dialogParameters, setDialogParameters] = useState({ open: false })
	const [isDirty, setIsDirty] = useState(true)
	const [preLoad, setPreLoad] = useState(false)
	const [proponentName, setProponentName] = useState()
	const [roles, setRoles] = useState()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const handleDirty = (newDirty) => {
		setIsDirty(newDirty)
	}

	const handlePreLoad = (newPreLoad) => {
		setPreLoad(newPreLoad)
	}

	const isValidProponentName = () => {
		if (proponentName) {
			if (proponentName.length < 0 || proponentName.length > 255) {
				return false
			} else {
				return true
			}
		} else {
			return false
		}
	}

	const getUnansweredQuestionCount = async (questionListName) => {
		const questions = await GetListItems({ listName: questionListName, filter: 'Answer eq null' })
console.log('questions :>> ', questions);
		const length = questions.length

		return length
	}

	const additionalData = async (list) => {
		const { title, columns, items } = list

		for (let i = 0; i < items.length; i++) {
			items[i].UnansweredQuestionCount = await getUnansweredQuestionCount(
				`${items[i].UUID}_Questions`
			)
		}

		return { title, columns, items }
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
								options={tableOptions}
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
				icon: () => {
					return (
						<Badge
							badgeContent={rowData.UnansweredQuestionCount}
							color='secondary'>
							<QuestionAnswerIcon color={'primary'} />
						</Badge>
					)
				},
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
								options={tableOptions}
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
						const addUsersCallback = (users) => {
							users.map((user) => {
								LogAction(
									`added ${user.Title} to ${rowdata.Title}`
								)
								enqueueSnackbar(
									`${user.Title} Added to ${rowdata.Title}`,
									{
										variant: 'success',
									}
								)
							})

							SendAddUserConfirmationEmail(users, rowdata.Title)
						}
						const removeUserCallback = (response) => {
							LogAction(
								`removed ${response.Title} from ${rowdata.Title}`
							)
							enqueueSnackbar('User Removed Successfully', {
								variant: 'warning',
							})
						}
						setDialogParameters({
							open: true,
							title: `${rowdata.Title} - ${rowdata.UUID}`,
							content: (
								<SPGroup
									groupId={rowdata.GroupId}
									addUser={true}
									addUsersCallback={addUsersCallback}
									removeUserCallback={removeUserCallback}
									removeUser={true}
									editGroup={false}
									options={tableOptions}
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
				? () => <ToggleOnIcon style={{ color: green[500] }} />
				: () => <ToggleOffIcon style={{ color: red[500] }} />,
			tooltip: 'Toggle Proponent Active / Inactive',
			onClick: (event, rowdata) => {
				const callBack = () => {
					LogAction(
						`set ${rowdata.Title} to ${
							rowdata.Active ? 'inactive' : 'active'
						}`
					)
					enqueueSnackbar(
						`set ${rowdata.Title} to ${
							rowdata.Active ? 'inactive' : 'active'
						}`,
						{
							variant: 'warning',
						}
					)
					setDialogParameters({ open: false })
					setIsDirty(true)
				}
				setDialogParameters({
					open: true,
					title: `${rowdata.Title} - ${rowdata.UUID}`,
					content: rowdata.Active ? (
						<Alert severity='error'>
							Proponent Group will be deleted; member users will
							no-longer be able to access the site.
						</Alert>
					) : (
						<Alert severity='info'>
							A new group will be created for the proponent. You
							will need to manually add users.
						</Alert>
					),
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

	const addOptions = {
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
					setProponentName(e.target.value)
				}}
			/>
		),
		saveButtonText: 'Submit',
		saveAction: (param) => {
			handlePreLoad(true)
			AddProponent(proponentName, roles, enqueueSnackbar)
				.then((response) => {
					LogAction(`added ${proponentName} as proponent`)
					handlePreLoad(false)
					setIsDirty(true)
				})
				.catch((err) => {
					console.error('add proponent error', err)
				})
		},
		cancelButtonText: 'Cancel',
		cancelAction: () => {
			console.warn(`${proponentName} cancelled`)
		},
		isValid: isValidProponentName,
		validationText:
			'Proponent Name can not be blank or longer than 255 characters',
	}

	const getRoleDefinitions = async () => {
		const roleDefs = await GetRoleDefinitions({})

		if (roleDefs['Read with Add']) {
			setRoles(roleDefs)
		} else {
			setDialogParameters({
				open: true,
				title: `ERROR`,
				content: (
					<Alert severity='error'>
						Site Collection is missing the 'Read with Add'
						Permission Level, please contact your Site Collection
						Administrator
					</Alert>
				),
				showSave: false,
				cancelButtonText: 'Close',
				cancelButtonAction: () => {
					setDialogParameters({ open: false })
				},
			})
		}
	}

	useEffect(() => {
		getRoleDefinitions()
		return () => {}
	}, [])

	return (
		<Fragment>
			<SPList
				listName={proponentListName}
				addItem={true}
				addOptions={addOptions}
				deleteItem={false}
				editItem={false}
				changeItemPermission={false}
				customActions={customActions}
				options={tableOptions}
				preLoad={preLoad}
				isDirty={isDirty}
				handleDirty={handleDirty}
				handlePreLoad={handlePreLoad}
				additionalData={additionalData}
			/>
			<SPDialog {...dialogParameters} />
		</Fragment>
	)
}
