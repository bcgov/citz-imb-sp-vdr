import React from 'react'
import { Field } from 'formik'
import {
    FormControl,
    FormLabel,
	InputLabel,
	FormHelperText,
    Select as MUSelect,
    MenuItem
} from '@material-ui/core'

export const Select = (props) => {
	const { label, name, required, options, ...rest } = props
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<MUSelect id={name} variant={'outlined'} {...rest} {...field}>
							{options.map((option, index) => {
								return (
									<MenuItem
										key={`${name}_option_${index}`}
										value={option.value}>
										{option.key}
									</MenuItem>
								)
							})}
						</MUSelect>
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				)
			}}
		</Field>
	)
}
