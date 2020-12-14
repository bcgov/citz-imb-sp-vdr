import React, { Fragment, useState, useEffect } from 'react'
import {
	IconButton,
	LinearProgress,
	Tabs,
	Tab,
	makeStyles,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import { GetRoleDefinitions } from 'citz-imb-sp-utilities'
import {
	FormikDialog,
	useProponents,
	useLogAction,
	VerticalTabPanel,
} from 'Components'
import * as Yup from 'yup'
import { ManagementTab } from '../ManagementTab/ManagementTab'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 224,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}))

export const ProponentManagement = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [proponentNames, setProponentNames] = useState([])
	const [showRoleAlert, setShowRoleAlert] = useState(false)
	const {
		addProponent,
		getProponent,
		setProponentActive,
		setProponentInactive,
		isLoading: proponentsIsLoading,
		proponents,
	} = useProponents()

	const logAction = useLogAction()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const getRoleDefinitions = async () => {
		const roleDefs = await GetRoleDefinitions({})

		if (!roleDefs['Read with Add']) {
			setShowRoleAlert(true)
		}
	}

	const handleAddProponentClick = () => {
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
				logAction(`created proponent '${values.proponentName}'`)
				setSubmitting(false)
				setDialogOptions({ open: false })
			},
		})
	}

	useEffect(() => {
		if (!proponentsIsLoading) {
			setProponentNames(
				proponents.map((proponent) => proponent.Title.toLowerCase())
			)
			setIsLoading(false)
		}

		return () => {}
	}, [proponentsIsLoading, proponents])

	useEffect(() => {
		getRoleDefinitions()
		return () => {}
	}, [])

	return (
		<Fragment>
			{isLoading ? (
				<LinearProgress />
			) : showRoleAlert ? (
				<Alert severity='error'>
					<AlertTitle>Missing Permission Level</AlertTitle>
					Site Collection is missing the 'Read with Add' Permission
					Level, please contact your Site Collection Administrator
				</Alert>
			) : (
				<Fragment>
					<IconButton
						aria-label={'Add Proponent'}
						onClick={handleAddProponentClick}>
						<AddIcon />
					</IconButton>
					<div className={classes.root}>
						<Tabs
							orientation='vertical'
							variant='scrollable'
							value={value}
							onChange={handleChange}
							aria-label='Vertical tabs example'
							className={classes.tabs}>
							{proponents.map((proponent, index) => {
								return (
									<Tab
										key={index}
										label={proponent.Title}
										{...a11yProps(index)}
									/>
								)
							})}
						</Tabs>
						{proponents.map((proponent, index) => {
							return (
								<VerticalTabPanel
									key={index}
									value={value}
									index={index}>
									<ManagementTab
										{...proponent}
										isLoading={isLoading}
										getProponent={getProponent}
										setProponentActive={setProponentActive}
										setProponentInactive={
											setProponentInactive
										}
									/>
								</VerticalTabPanel>
							)
						})}
					</div>
					<FormikDialog {...dialogOptions} />
				</Fragment>
			)}
		</Fragment>
	)
}
