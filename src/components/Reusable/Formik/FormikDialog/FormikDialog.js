import React, { useEffect, useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	LinearProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FormikControls } from 'components';
import { Markup } from 'interweave';
import * as Yup from 'yup';

export const FormikDialog = (props) => {
	const {
		fields = [],
		onSubmit,
		open,
		close,
		title,
		children,
		instructions,
		dialogContent,
		submitButtonText = 'Submit',
		cancelButtonText = 'Cancel',
		validationSchema: validationSchemaProps,
		...remainingDialogProps
	} = props;
	const [initialValues, setInitialValues] = useState({});
	const [validationSchema, setValidationSchema] = useState(
		validationSchemaProps
	);
	const [controls, setControls] = useState([]);

	const getValidationSchema = useCallback(() => {
		const _validationSchema = {};
		for (let i = 0; i < fields.length; i++) {
			_validationSchema[fields[i].name] = fields[i].validationSchema;
		}

		return Yup.object(_validationSchema);
	}, [fields]);

	useEffect(() => {
		if (open) {
			const _initialValues = {};

			const _controls = [];

			for (let i = 0; i < fields.length; i++) {
				_initialValues[fields[i].name] = fields[i].initialValue;

				let options = {
					control: fields[i].control,
					name: fields[i].name,
					label: fields[i].label,
					required: fields[i].required,
					options: fields[i].options,
					// fullWidth: true,
				};

				_controls.push(<FormikControls {...options} />);
			}

			setInitialValues(_initialValues);
			setControls(_controls);
		}
		return () => {};
	}, [open, fields]);

	useEffect(() => {
		if (validationSchemaProps) {
			setValidationSchema(validationSchemaProps);
		} else if (fields.length) {
			setValidationSchema(getValidationSchema());
		}

		return () => {};
	}, [validationSchemaProps, fields, getValidationSchema]);

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
									{instructions ? (
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
									{dialogContent ? dialogContent : null}
									{children}
									{controls.map((control, index) => {
										return (
											<Grid
												key={`control_${index}`}
												item
												xs={'auto'}>
												{control}
											</Grid>
										);
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
										{submitButtonText}
									</Button>
								) : null}

								<Button
									variant='contained'
									color='primary'
									disabled={isSubmitting}
									onClick={close}>
									{cancelButtonText}
								</Button>
							</DialogActions>
						</Form>
					);
				}}
			</Formik>
		</Dialog>
	);
};
