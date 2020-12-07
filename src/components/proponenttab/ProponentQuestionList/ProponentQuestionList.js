import React, { useState, useContext, useEffect, Fragment } from 'react'
import { IconButton, LinearProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { GetGroupMembers, GetUserByEmail } from 'citz-imb-sp-utilities'
import {
	UserContext,
	useList,
	FormikDialog,
	useLogAction,
	ConfigContext,
	SendConfirmationEmail,
	useProponents,
} from 'Components'
import * as Yup from 'yup'

export const ProponentQuestionList = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [dialogOptions, setDialogOptions] = useState({ open: false })

	const currentUser = useContext(UserContext)
	const config = useContext(ConfigContext)
	const { contactEmail, addQuestionEmail, newQuestionEmail } = config.items

	const logAction = useLogAction()

	const { getProponent, isLoading: proponentsIsLoading } = useProponents()

	const {
		addColumns,
		addItem,
		changeView,
		columns,
		fields,
		isLoading: listIsLoading,
		items,
		refresh,
		title,
		updateItem,
		views,
		getRender,
	} = useList(`${currentUser.proponent}_Questions`)

	const sendEmails = async () => {
		const proponent = getProponent(currentUser.proponent)

		const groupMembers = await GetGroupMembers({
			groupId: proponent.GroupId,
		})

		for (let i = 0; i < groupMembers.length; i++) {
			await SendConfirmationEmail({
				addresses: groupMembers[i].LoginName,
				proponent: proponent.Title,
				subject: addQuestionEmail.TextValue,
				body: addQuestionEmail.MultiTextValue,
				additionalReplacementPairs: [
					{
						searchvalue: /\[UserName\]/g,
						newvalue: currentUser.name,
					},
					{
						searchvalue: /\[AddresseeName\]/g,
						newvalue: groupMembers[i].Title,
					},
				],
			})
		}
		const contactEmailUser = await GetUserByEmail({
			email: contactEmail.TextValue,
		})

		await SendConfirmationEmail({
			addresses: contactEmailUser[0].LoginName,
			proponent: proponent.Title,
			subject: newQuestionEmail.TextValue,
			body: newQuestionEmail.MultiTextValue,
		})
	}

	const onQuestionSubmit = async (values, { setSubmitting }) => {
		try {
			await addItem(values)
			await sendEmails()
			logAction(`successfully asked ${values.Title}`)
			refresh()
		} catch (error) {
			console.error('error submitting question', error)
		}
		setSubmitting(false)
		setDialogOptions({ open: false })
	}

	const listOptions = {
		customActions: [
			{
				render: (
					<IconButton
						onClick={() => {
							setDialogOptions({
								open: true,
								close: () => {
									setDialogOptions({ open: false })
								},
								fields: [
									{
										name: 'Title',
										label: 'Question',
										initialValue: '',
										validationSchema: Yup.string().required(
											'Required'
										),
										required: true,
										control: 'input',
									},
								],
								onSubmit: onQuestionSubmit,
								title: 'Ask a Question',
							})
						}}>
						<AddIcon />
					</IconButton>
				),
				tooltip: 'Submit Question',
				isFreeAction: true,
			},
		],
		initialState: { sortBy: [{ id: 'Created', desc: true }] },
		customColumns: [
			{
				accessor: 'Answer',
				Cell: ({ value }) => {
					return value ? "true" : "Not Started"
				},
			},
		],
		//addRecord: true,
		// columnFiltering: false,

		// showTitle: false,
		// 	tableTitle,
		// deleteItem = false,
		// editItem = false,
		// changeItemPermissions = false,
		// 	refresh = true,
	}

	useEffect(() => {
		if (!listIsLoading && !proponentsIsLoading) {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}
		return () => {}
	}, [listIsLoading, proponentsIsLoading])

	// const [refresh, setRefresh] = useState(true)
	// const [askQuestionDialog, setAskQuestionDialog] = useState(false)
	// const [viewAnswerDialog, setViewAnswerDialog] = useState(false)
	// const [currentItemId, setCurrentItemId] = useState()

	// const closeAnswerDialog = () => {
	// 	setViewAnswerDialog(false)
	// }
	// const closeQuestionDialog = () => {
	// 	setAskQuestionDialog(false)
	// 	setRefresh(!refresh)
	// }

	// const openAnswerDialog = (itemId) => {
	// 	setCurrentItemId(itemId)
	// 	setViewAnswerDialog(true)
	// }

	// const questionOptions = {
	// 	tableTitle: 'Our Submitted Questions',
	// 	refresh: refresh,
	// 	initialState: { sortBy: [{ id: 'Created', desc: true }] },
	// 	columnFiltering: false,
	//

	// }

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : getRender(listOptions)}
			<FormikDialog {...dialogOptions} />
			{/* <SPList {...listOptions} /> */}
			{/* <AskQuestionDialog
				open={askQuestionDialog}
				closeDialog={closeQuestionDialog}
				listName={listName}
				proponentName={proponentName}
				groupId={groupId}
			/>
			<ViewAnswerDialog
				open={viewAnswerDialog}
				closeDialog={closeAnswerDialog}
				listName={listName}
				itemId={currentItemId}
			/> */}
		</Fragment>
	)
}
