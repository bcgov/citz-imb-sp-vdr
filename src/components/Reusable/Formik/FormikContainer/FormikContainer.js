import React from 'react'
import { Formik, Form } from 'formik'
import { Button, LinearProgress, Grid } from '@material-ui/core'
import { FormikControls } from 'components'
import * as Yup from 'yup'

export const FormikContainer = (props) => {
	const initialValues = {
		title: '',
		description: '',
		select: '',
		checkbox: '',
		radio: '',
	}
	const validationSchema = Yup.object({
		title: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
		select: Yup.string().required('Required'),
		radio: Yup.string().required('Required'),
		checkbox: Yup.array().required('Required'),
	})
	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			alert(JSON.stringify(values, null, 2))
		}, 500)
	}
	const selectOptions = [
		{ key: 'Pick A Value', value: '' },
		{ key: 'first', value: 'first' },
		{ key: 'second', value: 'second' },
		{ key: 'third', value: 'third' },
	]
	const radioOptions = [
		{ key: 'first', value: 'first' },
		{ key: 'second', value: 'second' },
		{ key: 'third', value: 'third' },
	]
	const checkedOptions = [
		{ key: 'Option 1', value: 'Option 1' },
		{ key: 'Option 2', value: 'Option 2' },
		{ key: 'Option 3', value: 'Option 3' },
	]

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({ submitForm, isSubmitting }) => {
				return (
					<Form>
						<Grid container direction={'column'} spacing={1}>
							<Grid item>
								<FormikControls
									control='input'
									name='title'
									label='Title'
									required={true}
								/>
							</Grid>
							<Grid item>
								<FormikControls
									control='textarea'
									name='description'
									label='Description'
									required={true}
								/>
							</Grid>
							<Grid item>
								<FormikControls
									control='select'
									name='select'
									label='Select'
									options={selectOptions}
									required={true}
								/>
							</Grid>
							<Grid item>
								<FormikControls
									control='radio'
									name='radio'
									label='Radio'
									options={radioOptions}
									required={true}
								/>
							</Grid>
							<Grid item>
								<FormikControls
									control='checkbox'
									name='checkbox'
									label='Checkbox'
									options={checkedOptions}
									required={true}
								/>
							</Grid>
							<Grid item>
								<FormikControls
									control='date'
									name='date'
									label='Date'
									required={true}
								/>
							</Grid>
						</Grid>

						{isSubmitting && <LinearProgress />}
						<br />
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}>
							Submit
						</Button>
					</Form>
				)
			}}
		</Formik>
	)
}
