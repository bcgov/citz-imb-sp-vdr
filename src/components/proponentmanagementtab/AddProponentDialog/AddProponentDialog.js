import React, { useState, useEffect, useContext, Fragment } from 'react'
import { GetListItems, GetRoleDefinitions } from 'citz-imb-sp-utilities'
import { FormikDialog, AddProponent } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'

export const AddProponentDialog = ({ open, close }) => {
	const [proponentNames, setProponentNames] = useState([])
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const [roles, setRoles] = useState()
	const [showRoleAlert, setShowRoleAlert] = useState(false)

	const dialogProps = {
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
		onSubmit: (values) => {
			console.log('values', values)
			AddProponent(values.proponentName, enqueueSnackbar, roles, close)
		},

		title: 'Add Proponent',
	}
	const getRoleDefinitions = async () => {
		const roleDefs = await GetRoleDefinitions({})

		if (roleDefs['Read with Add']) {
			setRoles(roleDefs)
		} else {
			setShowRoleAlert(true)
		}
	}

	const getProponentNames = async () => {
		const items = await GetListItems({
			listName: 'Proponents',
			select: 'Title',
		})
		setProponentNames(items.map((item) => item.Title.toLowerCase()))
	}

	useEffect(() => {
		getRoleDefinitions()
		getProponentNames()
		return () => {}
	}, [])

	return (
		<Fragment>
			{showRoleAlert ? (
				<Alert severity='error'>
					Site Collection is missing the 'Read with Add' Permission
					Level, please contact your Site Collection Administrator
				</Alert>
			) : (
				<FormikDialog open={open} close={close} {...dialogProps} />
			)}
		</Fragment>
	)
}
