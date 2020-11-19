import React from 'react'
import { Field } from 'formik'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input as MUInput,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { usePeoplePicker } from 'Components'

export const PeoplePicker = (props) => {
	const {
		label,
		name,
		required,
		getUserInfo,
		options,
		...rest //options
	} = props

	const { onChange, searchResults, reset } = usePeoplePicker()

	const changeHandler = (event, value, reason) => {
		console.log('value', value)
		getUserInfo(value)
		reset()
	}

	return (
		<Autocomplete
			autoHighlight={true}
			multiple
			options={searchResults}
			getOptionLabel={(option) => option.DisplayText}
			onChange={changeHandler}
			filterSelectedOptions
			renderInput={(params) => (
				<Field name={name}>
					{({ field, form }) => {
						return (
							<FormControl
								error={form.errors[name] && form.touched[name]}
								required={required}>
								<FormLabel htmlFor={name}>{label}</FormLabel>
								<MUInput
									id={name}
									onChange={onChange}
									// {...rest}
									{...params.inputProps}
									{...field}
								/>
								<FormHelperText>
									{form.errors[name]}
								</FormHelperText>
							</FormControl>
						)
					}}
				</Field>
			)}
			{...rest}
		/>
	)
}
