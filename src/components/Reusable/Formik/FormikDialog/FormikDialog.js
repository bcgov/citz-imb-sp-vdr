import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	LinearProgress,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikControls } from 'Components'
import { Markup } from 'interweave'
import * as Yup from 'yup'

export const FormikDialog = (props) => {
	const {
		fields = [],
		onSubmit,
		open,
		close,
		title,
		instructions,
		dialogContent,
		...remainingDialogProps
	} = props
	const [initialValues, setInitialValues] = useState({})
	const [validationSchema, setValidationSchema] = useState({})
	const [controls, setControls] = useState([])

	useEffect(() => {
		if (open) {
			const _initialValues = {}
			const _validationSchema = {}
			const _controls = []

			for (let i = 0; i < fields.length; i++) {
				_initialValues[fields[i].name] = fields[i].initialValue
				_validationSchema[fields[i].name] = fields[i].validationSchema
				let options = {
					control: fields[i].control,
					name: fields[i].name,
					label: fields[i].label,
					required: fields[i].required,
					options: fields[i].options,
					fullWidth: true,
				}

				_controls.push(<FormikControls {...options} />)
			}

			setInitialValues(_initialValues)
			setValidationSchema(Yup.object(_validationSchema))
			setControls(_controls)
		} else {
			setInitialValues({})
			setValidationSchema({})
			setControls([])
		}
		return () => {}
	}, [open])

	return (
		<Dialog open={open} onClose={close} {...remainingDialogProps}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}>
				{({ submitForm, isSubmitting }) => {
					return (
						<Form>
							<DialogTitle>{title}</DialogTitle>
							<DialogContent dividers={true}>
								<Grid
									container
									direction={'column'}
									spacing={1}>
									{dialogContent ? (
										dialogContent
									) : instructions ? (
										<Grid item>
											<Alert severity={'info'}>
												<AlertTitle>
													Instructions
												</AlertTitle>
												<Markup
													content={instructions}
												/>
											</Alert>
										</Grid>
									) : null}
									{controls.map((control, index) => {
										return (
											<Grid
												key={`control_${index}`}
												item
												xs={'auto'}>
												{control}
											</Grid>
										)
									})}
									{isSubmitting ? <LinearProgress /> : null}
								</Grid>
							</DialogContent>
							<DialogActions>
								{onSubmit ? (
									<Button
										variant='contained'
										color='primary'
										disabled={isSubmitting}
										onClick={submitForm}>
										Submit
									</Button>
								) : null}

								<Button
									variant='contained'
									color='primary'
									disabled={isSubmitting}
									onClick={close}>
									Cancel
								</Button>
							</DialogActions>
						</Form>
					)
				}}
			</Formik>
		</Dialog>
	)
}
