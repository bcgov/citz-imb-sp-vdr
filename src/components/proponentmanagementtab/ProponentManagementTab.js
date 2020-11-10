import React, { Fragment, useState, useEffect } from 'react'
import { Button, IconButton, LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import Badge from '@material-ui/core/Badge'
import PeopleIcon from '@material-ui/icons/People'
import { green, red } from '@material-ui/core/colors'
import {
	AddProponentDialog,
	icons,
	ProponentGroupDialog,
	ProponentLibraryDialog,
	ProponentQuestionDialog,
	FormikDialog,
	useList,
	ViewAnswerButton,
	ListTable,
	useProponents,
} from 'Components'
import { GetListItems } from 'citz-imb-sp-utilities'
import * as Yup from 'yup'

//TODO: convert to ListTable
export const ProponentManagementTab = () => {
	const listName = 'Proponents'

	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [questionDialogOptions, setQuestionDialogOptions] = useState({
		open: false,
	})
	const [refreshTable, setRefreshTable] = useState(true)
	const [proponentNames, setProponentNames] = useState([])
	//const { items, refresh, isLoading, updateItem } = useList(listName)
	const {
		addProponent,
		setProponentActive,
		setProponentInactive,
		addUserToProponent,
		removeUserFromProponent,
		getProponent,
		isLoading,
		proponents,
	} = useProponents()

	const handleToggleClick = (event) => {
		const proponent = getProponent(
			event.currentTarget.getAttribute('data-id')
		)

		console.log('proponent', proponent)

		setDialogOptions({
			open: true,
			close: () => {
				setDialogOptions({ open: false })
			},
			title: `Set ${proponent.Title} to ${
				proponent.Active ? 'Inactive' : 'Active'
			}`,
			dialogContent: proponent.Active ? (
				<Alert severity={'error'}>
					Proponent Group will be deleted; member users will no-longer
					be able to access the site.
				</Alert>
			) : (
				<Alert severity={'info'}>
					A new group will be created for the proponent. You will need
					to manually add users.
				</Alert>
			),
			onSubmit: async (values, { setSubmitting }) => {
				console.log(proponent.Active)
				if (proponent.Active) {
					await setProponentInactive(proponent.UUID)
				} else {
					await setProponentActive(proponent.UUID)
				}
				setRefreshTable(!refreshTable)
				setSubmitting(false)
				setDialogOptions({ open: false })
			},
		})
	}

	const handleLibraryClick = async (event) => {
		const proponent = getProponent(
			event.currentTarget.getAttribute('data-id')
		)

		setDialogOptions({
			open: true,
			close: () => {
				setDialogOptions({ open: false })
			},
			title: `${proponent.Title} Submitted Documents`,
			dialogContent: <ListTable listName={proponent.UUID} />,
		})
	}

	const handleMembershipClick = async (event) => {
		const proponent = getProponent(
			event.currentTarget.getAttribute('data-id')
		)

		setDialogOptions({
			open: true,
			close: () => {
				setDialogOptions({ open: false })
			},
			title: `${proponent.Title} Membership`,
			dialogContent: 'hello',
			onSubmit: async (values, { setSubmitting }) => {
				setSubmitting(false)
				setDialogOptions({ open: false })
			},
		})
	}

	const handleAnswerClick = async (event) => {}

	const handleQuestionListClick = async (event) => {
		const proponent = getProponent(
			event.currentTarget.getAttribute('data-id')
		)

		setQuestionDialogOptions({
			open: true,
			closeDialog: () => {
				setQuestionDialogOptions({ open: false })
			},
			title: `${proponent.Title} Submitted Questions`,
			proponentName: proponent.Title,

			listName: `${proponent.UUID}_Questions`,
			dialogContent: (
				<ListTable
					listName={`${proponent.UUID}_Questions`}
					customColumns={[
						{
							accessor: 'Answer',
							Cell: ({ value, row }) => {
								console.log('{value, row} :>> ', { value, row })
								return value ? (
									<Button
										data-id={row.values.UUID}
										onClick={handleAnswerClick}
										variant={'contained'}
										color={'primary'}>
										View Answer
									</Button>
								) : (
									<Button
										data-id={row.values.UUID}
										onClick={handleAnswerClick}
										variant={'contained'}
										color={'primary'}>
										Answer
									</Button>
								)
							},
						},
					]}
				/>
			),
		})
	}

	const handleAddProponentClick = (event) => {
		setDialogOptions({
			open: true,
			fields: [
				{
					name: 'proponentName',
					label: 'Proponent Name',
					initialValue: '',
					validationSchema: Yup.string()
						.required('Required')
						.transform((value, originalvalue) => {
							return value.toLowerCase()
						})
						.notOneOf(proponentNames, 'Proponent already exists'),
					control: 'input',
					required: true,
				},
			],
			close: () => {
				setDialogOptions({ open: false })
			},
			title: 'Add Proponent',
			onSubmit: async (values, { setSubmitting }) => {
				await addProponent(values.proponentName)
				setRefreshTable(!refreshTable)
				setSubmitting(false)
				setDialogOptions({ open: false })
			},
		})
	}

	const getUnansweredQuestionCount = async (questionListName) => {
		const questions = await GetListItems({
			listName: questionListName,
			filter: 'Answer eq null',
		})

		return questions.length
	}

	const proponentOptions = {
		listName: listName,
		refresh: refreshTable,
		initialState: { sortBy: [{ id: 'Title', desc: false }] },
		columnFiltering: false,
		customColumns: [
			{
				accessor: 'Active',
				Cell: ({ value, row }) => {
					return value ? (
						<IconButton
							data-id={row.values.UUID}
							onClick={handleToggleClick}>
							<ToggleOnIcon style={{ color: green[500] }} />
						</IconButton>
					) : (
						<IconButton
							data-id={row.values.UUID}
							onClick={handleToggleClick}>
							<ToggleOffIcon style={{ color: red[500] }} />
						</IconButton>
					)
				},
			},
		],
		customActions: [
			{
				render: (
					<IconButton
						aria-label={'Add Proponent'}
						onClick={handleAddProponentClick}>
						<AddIcon />
					</IconButton>
				),
				isFreeAction: true,
			},
			{
				Header: 'Library',
				id: 'proponentLibrary',
				onClick: handleLibraryClick,
				Cell: ({ row }) => {
					return (
						<IconButton
							data-id={row.values.UUID}
							aria-label={'Open Proponent Library'}
							onClick={handleLibraryClick}
							color={'primary'}>
							{' '}
							<LibraryBooksIcon />
						</IconButton>
					)
				},
			},
			{
				Header: 'Questions',
				id: 'proponentQuestionList',
				Cell: ({ row }) => {
					const proponent = getProponent(row.values.UUID)
					return (
						<IconButton
							data-id={row.values.UUID}
							aria-label={'Open Proponent Questions'}
							onClick={handleQuestionListClick}
							color={'primary'}>
							<Badge
								badgeContent={proponent.unansweredQuestionCount}
								color={'secondary'}>
								<QuestionAnswerIcon />
							</Badge>
						</IconButton>
					)
				},
			},
			{
				Header: 'Membership',
				id: 'proponentMembership',
				onClick: handleMembershipClick,
				Cell: ({ row }) => {
					return (
						<IconButton
							data-id={row.values.UUID}
							aria-label={'Manage Proponent Membership'}
							onClick={handleMembershipClick}
							color={'primary'}>
							{' '}
							<PeopleIcon />
						</IconButton>
					)
				},
			},
		],
	}


	//----------------------------
	// const [addProponentDialog, setAddProponentDialog] = useState(false)
	// const [proponentLibraryDialog, setproponentLibraryDialog] = useState(false)
	// const [proponentQuestionDialog, setproponentQuestionDialog] = useState(
	// 	false
	// )
	// const [userDialog, setUserDialog] = useState(false)
	// const [toggleDialog, setToggleDialog] = useState(false)

	// const [currentProponentId, setCurrentProponentId] = useState()
	// const [currentProponentName, setCurrentProponentName] = useState()
	// const [currentProponentGroup, setCurrentProponentGroup] = useState()
	// const [currentProponentActive, setCurrentProponentActive] = useState()
	// const [currentProponentItemId, setCurrentProponentItemId] = useState()

	// const handleCloseProponentDialog = () => {
	// 	setRefreshTable(!refreshTable)
	// 	setAddProponentDialog(false)
	// }
	// const handleCloseProponentLibraryDialog = () => {
	// 	setproponentLibraryDialog(false)
	// }
	// const handleCloseProponentQuestionDialog = () => {
	// 	setproponentQuestionDialog(false)
	// }
	// const handleCloseUserDialog = () => {
	// 	setUserDialog(false)
	// }
	// const handleCloseToggleDialog = () => {
	// 	setRefreshTable(!refreshTable)
	// 	setToggleDialog(false)
	// }

	// const additionalProponentData = async (list) => {
	// 	const { title, columns, items } = list

	// 	for (let i = 0; i < items.length; i++) {
	// 		items[i].UnansweredQuestionCount = await getUnansweredQuestionCount(
	// 			`${items[i].UUID}_Questions`
	// 		)
	// 	}

	// 	return { title, columns, items }
	// }

	// const handlePublishAnswer = (event) => {
	// 	const proponentQuestionID = event.currentTarget.dataset.id
	// 	const proponentList = event.currentTarget.dataset.list
	// }

	// const additionalQuestionData = async (list) => {
	// 	const { title, columns, items } = list

	// 	for (let i = 0; i < columns.length; i++) {
	// 		if (columns[i].title === 'Answer') {
	// 			columns[i].render = (rowdata) => {
	// 				if (rowdata.Answer === null) {
	// 					return (
	// 						<Button
	// 							color='primary'
	// 							size='small'
	// 							variant='outlined'
	// 							data-id={rowdata.Id}
	// 							data-list={title}
	// 							onClick={handlePublishAnswer}>
	// 							Publish Answer
	// 						</Button>
	// 					)
	// 				} else {
	// 					return <ViewAnswerButton />
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return { title, columns, items }
	// }

	// const customActions = [
	// 	(rowData) => {
	// 		return {
	// 			//manage proponent library
	// 			icon: () => {
	// 				return <LibraryBooksIcon color={'primary'} />
	// 			},
	// 			tooltip: 'Open Proponent Library',
	// 			onClick: (event, rowdata) => {
	// 				setCurrentProponentId(rowdata.UUID)
	// 				setCurrentProponentName(rowdata.Title)
	// 				setproponentLibraryDialog(true)
	// 			},
	// 		}
	// 	},
	// 	(rowData) => {
	// 		return {
	// 			//manage proponent questions
	// 			icon: () => {
	// 				return (
	// 					<Badge
	// 						badgeContent={rowData.UnansweredQuestionCount}
	// 						color='secondary'>
	// 						<QuestionAnswerIcon color={'primary'} />
	// 					</Badge>
	// 				)
	// 			},
	// 			tooltip: 'Open Proponent Questions',
	// 			onClick: (event, rowdata) => {
	// 				setCurrentProponentId(`${rowdata.UUID}_Questions`)
	// 				setCurrentProponentName(rowdata.Title)
	// 				setproponentQuestionDialog(true)
	// 			},
	// 		}
	// 	},
	// 	(rowData) => {
	// 		if (rowData.Active) {
	// 			return {
	// 				//manage proponent users
	// 				icon: () => <PeopleIcon color={'primary'} />,
	// 				tooltip: 'Manage User Accounts',
	// 				onClick: (event, rowdata) => {
	// 					setCurrentProponentGroup(rowdata.GroupId)
	// 					setCurrentProponentName(rowdata.Title)
	// 					setUserDialog(true)
	// 				},
	// 			}
	// 		} else {
	// 			return {
	// 				icon: PeopleIcon,
	// 				disabled: true,
	// 			}
	// 		}
	// 	},
	// 	(rowdata) => ({
	// 		//Activate / inactivate proponent
	// 		icon: rowdata.Active
	// 			? () => <ToggleOnIcon style={{ color: green[500] }} />
	// 			: () => <ToggleOffIcon style={{ color: red[500] }} />,
	// 		tooltip: 'Toggle Proponent Active / Inactive',
	// 		onClick: (event) => {},
	// 	}),
	// 	{
	// 		icon: icons.Add,
	// 		tooltip: 'Add Item',
	// 		isFreeAction: true,
	// 		onClick: (event, rowdata) => {
	// 			setAddProponentDialog(true)
	// 		},
	// 	},
	// ]

	return (
		<Fragment>
			{isLoading ? (
				<LinearProgress />
			) : (
				<ListTable {...proponentOptions} />
			)}
			<FormikDialog {...dialogOptions} />
			<ProponentQuestionDialog {...questionDialogOptions} />

			{/*----------------------------------*/}
			{/* <AddProponentDialog
				open={addProponentDialog}
				close={handleCloseProponentDialog}
			/>

			<ProponentLibraryDialog
				open={proponentLibraryDialog}
				proponentName={currentProponentName}
				closeDialog={handleCloseProponentLibraryDialog}
				listName={currentProponentId}
			/>

			<ProponentGroupDialog
				open={userDialog}
				closeDialog={handleCloseUserDialog}
				groupId={currentProponentGroup}
				proponentName={currentProponentName}
			/> */}
		</Fragment>
	)
}
