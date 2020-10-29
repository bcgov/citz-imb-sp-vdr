import React from 'react'
import { Field } from 'formik'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Radio as MURadio,
	RadioGroup,
	FormControlLabel,
} from '@material-ui/core'

export const Radio = (props) => {
	const { label, name, required, options, ...rest } = props
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<RadioGroup id={name} {...rest} {...field}>
							{options.map((option, index) => {
								return (
									<FormControlLabel
										key={`${name}_option_${index}`}
										value={option.value}
										control={<MURadio />}
										label={option.key}
									/>
								)
							})}
						</RadioGroup>
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				)
			}}
		</Field>
	)
}
