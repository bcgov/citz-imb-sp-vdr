import React, { useState, useMemo, useContext, Fragment } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import {
	useGroup,
	useLogAction,
	FormikDialog,
	CustomTable,
	SendConfirmationEmail,
	ConfigContext,
} from 'Components'
import { IconButton, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

//TODO: CRUD operations
//TODO: global filter

export const GroupTable = (props) => {
	const {
		groupId,
		groupName,
		proponent,
		addRecord = false,
		showTitle = true,
		// deleteItem = false,
		// editItem = false,
		refresh = true,
	} = props

	const [dialog, setDialog] = useState({
		// fields: [],
		// onSubmit: () => {},
		open: false,
		// close: () => {},
		// title: '',
		// instructions: '',
	})

	const logAction = useLogAction()
	const { items } = useContext(ConfigContext)
	const { addUserEmail } = items

	const {
		addGroupMember,
		// createGroup,
		// deleteGroup,
		group,
		isLoading,
		members,
		removeGroupMember,
		// updateGroup,
	} = useGroup(groupId, groupName)

	const columns = useMemo(() => {
		return [
			{
				Header: 'Title',
				accessor: 'Title',
				Filter: true,
				disableFilters: true,
			},
			{
				Header: 'E-mail',
				accessor: 'Email',
				Filter: true,
				disableFilters: true,
			},
			{
				Header: 'Remove',
				id: 'removeMember',
				Cell: ({ row }) => {
					const clickHandler = () => {
						removeItemDialog(row)
					}

					return (
						<IconButton color={'primary'} onClick={clickHandler}>
							<DeleteOutlineIcon />
						</IconButton>
					)
				},
			},
		]
	}, [group])

	const data = useMemo(() => members, [members])

	const tableDataOptions = useTable(
		{ columns, data, initialState: {} },
		useFilters,
		useSortBy,
		usePagination
	)

	const addItemDialog = () => {
		setDialog({
			fields: [
				{
					name: 'members',
					label: 'Members',
					initialValue: '',
					//validationSchema: Yup.string().required('Required'),
					control: 'peoplepicker',
				},
			],
			onSubmit: async (values, { setSubmitting }) => {
				console.log('values', values)
				const members = values.members.map(member=>member.DisplayText)
				try {
					await addGroupMember(values)
					logAction(
						`added ${members.join('; ')} to ${proponent} group`
					)
					const addresses = values.members.map(async (member) => {
						console.log('member :>> ', member)
						await SendConfirmationEmail({
							addresses: member.Key,
							proponent,
							subject: addUserEmail.TextValue,
							body: addUserEmail.MultiTextValue,
							additionalReplacementPairs: [
								{
									searchvalue: /\[AddresseeName\]/g,
									newvalue: member.DisplayText,
								},
							],
						})
						logAction(`sent email to ${members.join('; ')}`)
					})

					setSubmitting(false)
					setDialog({ open: false })
				} catch (error) {
					throw error
				}
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: 'Add Member',
		})
	}

	const removeItemDialog = ({ original }) => {
		setDialog({
			dialogContent: (
				<Alert>
					<AlertTitle>Remove {original.Title} from Group?</AlertTitle>
					{original.Title} will no longer have access to this site
				</Alert>
			),
			onSubmit: async (values, { setSubmitting }) => {
				try {
					await removeGroupMember(original.Id)
					logAction(
						`removed ${original.Title} from ${proponent} group`
					)
					setSubmitting(false)
					setDialog({ open: false })
				} catch (error) {
					throw error
				}
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: 'Remove Member',
		})
	}

	const tableOptions = {
		showTitle,
		addRecord,
		addItemCallback: addItemDialog,
		tableDataOptions,
		columns,
	}

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : <CustomTable {...tableOptions} />}
			<FormikDialog {...dialog} />
		</Fragment>
	)
}
