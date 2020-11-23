import React, { useState, useEffect } from 'react'
import { usePeoplePicker } from './usePeoplePicker'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export const PeoplePicker = (props) => {
	const {
		name,
		label,
		placeholder,
		variant,
		setFieldValue,
		options,
		...remainingProps
	} = props
	const { onChange, searchResults, reset } = usePeoplePicker()

	const changeHandler = (event, value, reason) => {
		setFieldValue(name, value, false)
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
				<TextField
					{...params}
					onChange={onChange}
					variant={variant}
					label={label}
					placeholder={placeholder}
				/>
			)}
			name={name}
			{...remainingProps}
		/>
	)
}

// <Autocomplete
// 	autoHighlight={true}
// 	multiple
// 	options={searchResults}
// 	getOptionLabel={(option) => option.DisplayText}
// 	onChange={changeHandler}
// 	filterSelectedOptions
// 	renderInput={(params) => (
// 		<FormControl
// 			error={
// 				form.errors[name] && form.touched[name]
// 			}
// 			required={required}>
// 			<FormLabel htmlFor={name}>
// 				{label}
// 			</FormLabel>
// 			<MUInput
// 				id={name}
// 				onChange={onChange}
// 				// {...rest}
// 				{...params.inputProps}
// 				{...field}
// 			/>
// 			<FormHelperText>
// 				{form.errors[name]}
// 			</FormHelperText>
// 		</FormControl>
// 	)}
// 	{...rest}
// />
