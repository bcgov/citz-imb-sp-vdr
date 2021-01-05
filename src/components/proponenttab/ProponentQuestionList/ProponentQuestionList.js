import React, { useState, useContext, useEffect, Fragment } from 'react'
import {
	Button,
	IconButton,
	LinearProgress,
	Chip,
	Divider,
	List,
	ListItem,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import { GetGroupMembers, GetUserByEmail } from 'citz-imb-sp-utilities'
import {
	AnswerCell,
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
		addItem,
		isLoading: listIsLoading,
		items,
		refresh,
		updateItem,
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
		let latestItem = { Id: 0 }
		let nextQuestionNumber

		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].Id > latestItem.Id) latestItem = items[i]
			}

			nextQuestionNumber = parseInt(latestItem.QuestionID.slice(-3)) + 1
		} else {
			nextQuestionNumber = 1
		}

		const nextQuestionNumberString = nextQuestionNumber.toString()

		values.QuestionID = `${
			currentUser.proponent
		}-${nextQuestionNumberString.padStart(3, '0')}`

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

	const withdrawQuestion = async (values) => {
		try {
			await updateItem({
				Id: values.Id,
				Withdrawn: true,
				AnswerStatus: 'Withdrawn',
				Assignee: '',
			})
			logAction(`successfully withdrew ${values.Title}`)
		} catch (error) {
			console.error('error withdrawing question', error)
		}
	}

	const listOptions = {
		tableTitle: 'Submitted Questions',
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
				Header: 'Status / Answer',
				Cell: ({ value, row }) => {
					return (
						<AnswerCell
							row={row}
							setDialogOptions={setDialogOptions}
							withdrawQuestion={withdrawQuestion}
							value={value}
						/>
					)
				},
			},
		],
	}

	useEffect(() => {
		if (!listIsLoading && !proponentsIsLoading) {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}
		return () => {}
	}, [listIsLoading, proponentsIsLoading])

	return currentUser.proponent === 'not a proponent' ? (
		<Alert severity={'info'}>User is not a proponent</Alert>
	) : (
		<Fragment>
			{isLoading ? <LinearProgress /> : getRender(listOptions)}
			<FormikDialog {...dialogOptions} />
		</Fragment>
	)
}
