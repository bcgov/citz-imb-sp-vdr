import React, { Fragment, useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import Badge from '@material-ui/core/Badge'
import PeopleIcon from '@material-ui/icons/People'
import { green, red } from '@material-ui/core/colors'
import {
	SPTable,
	SPList,
	AddUserDialog,
	LogAction,
	icons,
	SPDialog,
	ToggleProponentDialog,
	AddProponentDialog,
	SPGroup,
	SendAddUserConfirmationEmail,
	tableOptions,
	ProponentLibraryDialog,
	ProponentQuestionDialog,
} from 'Components'
import { GetRoleDefinitions, GetListItems } from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'

export const ProponentManagementTab = () => {
	const listName = 'Proponents'

	const [addProponentDialog, setAddProponentDialog] = useState(false)
	const [proponentLibraryDialog, setproponentLibraryDialog] = useState(false)
	const [proponentQuestionDialog, setproponentQuestionDialog] = useState(
		false
	)
	const [userDialog, setUserDialog] = useState(false)
	const [toggleDialog, setToggleDialog] = useState(false)

	const [currentProponentId, setCurrentProponentId] = useState()
	const [currentProponentName, setCurrentProponentName] = useState()
	const [currentProponentGroup, setCurrentProponentGroup] = useState()
	const [currentProponentActive, setCurrentProponentActive] = useState()
	const [currentProponentItemId, setCurrentProponentItemId] = useState()

	const [refreshTable, setRefreshTable] = useState(true)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const handleCloseProponentDialog = () => {
		setRefreshTable(!refreshTable)
		setAddProponentDialog(false)
	}
	const handleCloseProponentLibraryDialog = () => {
		setproponentLibraryDialog(false)
	}
	const handleCloseProponentQuestionDialog = () => {
		setproponentQuestionDialog(false)
	}
	const handleCloseUserDialog = () => {
		setUserDialog(false)
	}
	const handleCloseToggleDialog = () => {
		setRefreshTable(!refreshTable)
		setToggleDialog(false)
	}

	const getUnansweredQuestionCount = async (questionListName) => {
		const questions = await GetListItems({
			listName: questionListName,
			filter: 'Answer eq null',
		})

		return questions.length
	}

	const additionalProponentData = async (list) => {
		const { title, columns, items } = list

		for (let i = 0; i < items.length; i++) {
			items[i].UnansweredQuestionCount = await getUnansweredQuestionCount(
				`${items[i].UUID}_Questions`
			)
		}

		return { title, columns, items }
	}

	const handlePublishAnswer = (event) => {
		const proponentQuestionID = event.currentTarget.dataset.id
		const proponentList = event.currentTarget.dataset.list

	}

	const additionalQuestionData = async (list) => {
		const { title, columns, items } = list

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].title === 'Answer') {
				columns[i].render = (rowdata) => {
					if (rowdata.Answer === null) {
						return (
							<Button
								color='primary'
								size='small'
								variant='outlined'
								data-id={rowdata.Id}
								data-list={title}
								onClick={handlePublishAnswer}>
								Publish Answer
							</Button>
						)
					} else {
						return <Button color='secondary'>View Answer</Button>
					}
				}
			}
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
					setCurrentProponentId(rowdata.UUID)
					setCurrentProponentName(rowdata.Title)
					setproponentLibraryDialog(true)
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
					setCurrentProponentId(`${rowdata.UUID}_Questions`)
					setCurrentProponentName(rowdata.Title)
					setproponentQuestionDialog(true)
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
						setCurrentProponentGroup(rowdata.GroupId)
						setCurrentProponentName(rowdata.Title)
						setUserDialog(true)
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
				setCurrentProponentName(rowdata.Title)
				setCurrentProponentActive(rowdata.Active)
				setCurrentProponentGroup(rowdata.GroupId)
				setCurrentProponentId(rowdata.UUID)
				setCurrentProponentItemId(rowdata.Id)
				setToggleDialog(true)
			},
		}),
		{
			icon: icons.Add,
			tooltip: 'Add Item',
			isFreeAction: true,
			onClick: (event, rowdata) => {
				setAddProponentDialog(true)
			},
		},
	]

	return (
		<Fragment>
			<AddProponentDialog
				open={addProponentDialog}
				closeDialog={handleCloseProponentDialog}
			/>
			<SPTable
				listName={listName}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermissions={false}
				//				onClickCallback={onClickCallback}
				customActions={customActions}
				refresh={refreshTable}
				additionalData={additionalProponentData}
			/>
			<ProponentLibraryDialog
				open={proponentLibraryDialog}
				proponentName={currentProponentName}
				closeDialog={handleCloseProponentLibraryDialog}
				listName={currentProponentId}
			/>
			<ProponentQuestionDialog
				open={proponentQuestionDialog}
				proponentName={currentProponentName}
				closeDialog={handleCloseProponentQuestionDialog}
				listName={currentProponentId}
			/>
			<AddUserDialog
				open={userDialog}
				closeDialog={handleCloseUserDialog}
				groupId={currentProponentGroup}
				proponentName={currentProponentName}
			/>
			<ToggleProponentDialog
				open={toggleDialog}
				closeDialog={handleCloseToggleDialog}
				active={currentProponentActive}
				proponentName={currentProponentName}
				groupId={currentProponentGroup}
				proponentItemId={currentProponentItemId}
				proponentId={currentProponentId}
			/>
		</Fragment>
	)
}
