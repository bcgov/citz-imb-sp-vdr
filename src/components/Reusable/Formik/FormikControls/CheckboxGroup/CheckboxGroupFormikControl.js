import React from 'react'
import { Field } from 'formik'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from '@material-ui/core'

export const CheckboxGroupFormikControl = (props) => {
	const { label, name, required, options, ...rest } = props
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<FormGroup id={name} {...rest} {...field}>
							{options.map((option, index) => {
								return (
									<FormControlLabel
										key={`${name}_option_${index}`}
										control={
											<Checkbox id={options.value} {...field} value={option.value} checked={field.value.includes(option.value)} />
										}
										label={option.key}
									/>
								)
							})}
						</FormGroup>
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				)
			}}
		</Field>
	)
}
