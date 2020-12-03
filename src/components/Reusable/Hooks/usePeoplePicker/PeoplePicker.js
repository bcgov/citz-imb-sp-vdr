import React from 'react'
import { usePeoplePicker } from './usePeoplePicker'
import { TextField, LinearProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export const PeoplePicker = (props) => {
	const {
		name,
		label,
		placeholder,
		variant,
		setFieldValue,
		options,
		AllowEmailAddresses,
		AllowMultipleEntities,
		AllUrlZones,
		MaximumEntitySuggestions,
		PrincipalSource,
		PrincipalType,
		...remainingProps
	} = props
	const { onChange, searchResults, reset, isLoading } = usePeoplePicker({
		AllowEmailAddresses,
		AllowMultipleEntities,
		AllUrlZones,
		MaximumEntitySuggestions,
		PrincipalSource,
		PrincipalType,
	})

	const changeHandler = (event, value, reason) => {
		setFieldValue(name, value, false)
		reset()
	}

	return (
		<Autocomplete
			autoHighlight={true}
			multiple
			options={searchResults}
			getOptionLabel={(option) => {
				return option.DisplayText
			}}
			loading={isLoading}
			loadingText={<LinearProgress />}
			onChange={changeHandler}
			filterOptions={(option) => option}
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
