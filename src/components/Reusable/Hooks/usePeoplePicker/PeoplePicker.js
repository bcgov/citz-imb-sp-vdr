import React, { useState, useEffect } from 'react'
import { usePeoplePicker } from './usePeoplePicker'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export const PeoplePicker = (props) => {
	const { label, placeholder, variant, getUserInfo, ...rest } = props
	const { onChange, searchResults, reset } = usePeoplePicker()

	const changeHandler = (event, value, reason) => {
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
				<TextField
					{...params}
					onChange={onChange}
					variant={variant}
					label={label}
					placeholder={placeholder}
				/>
			)}
			{...rest}
		/>
	)
}
