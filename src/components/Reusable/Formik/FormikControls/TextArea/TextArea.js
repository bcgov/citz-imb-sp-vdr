import React from 'react'
import { Field } from 'formik'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	TextareaAutosize ,
} from '@material-ui/core'

export const TextArea = (props) => {
	const { label, name, required, ...rest } = props
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]} required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<TextareaAutosize id={name} rowsMin={3} cols={22} {...rest} {...field} />
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				)
			}}
		</Field>
	)
}
