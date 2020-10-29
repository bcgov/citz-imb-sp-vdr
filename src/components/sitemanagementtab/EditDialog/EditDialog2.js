import React, { useEffect } from 'react'
import { useFormik } from 'formik'

import { SPDialog } from 'Components'
import { DialogContentText, TextField, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export const EditDialog = ({
	open,
	title,
	instructions,
	textValue,
	textValueLabel,
	numberValue,
	numberValueLabel,
	multiTextValue,
	multiTextValueLabel,
	onValueChange = (field, newValue) => {},
	saveAction = () => {},
	closeAction = () => {},

	initialValues = {
		textValue: '',
		numberValue: 0,
		multiTextValue: '',
	},
}) => {
	const formik = useFormik({
		initialValues: {
			textValue: '',
		},
	})


    console.log('formik :>> ', formik.values)
	return (
		<SPDialog
			open={open}
			title={title}
			saveButtonAction={saveAction}
			cancelButtonAction={closeAction}
			fullScreen={true}>
			<form>
				<label htmlFor='textValue'>Text Value</label>
				<input
					type='text'
					id='textValue'
					name='textValue'
					onChange={formik.handleChange}
					value={formik.values.textValue}
				/>
			</form>
		</SPDialog>
	)
}
