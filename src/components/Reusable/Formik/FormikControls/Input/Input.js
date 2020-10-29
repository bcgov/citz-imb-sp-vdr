import React from 'react'
import { Field } from 'formik'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input as MUInput,
} from '@material-ui/core'

export const Input = (props) => {
	const { label, name, required, ...rest } = props
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]} required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<MUInput id={name} {...rest} {...field} />
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				)
			}}
		</Field>
	)
}
