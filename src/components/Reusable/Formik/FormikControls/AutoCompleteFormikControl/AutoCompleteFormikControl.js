import React from 'react'
import { Field } from 'formik'

export const AutoCompleteFormikControl = (props) => {
	const { name, options, ...remainingControlProps } = props

	return (
		<Field name={name}>
			{(fieldProps) => {
				return (
					<Autocomplete
						options={['one', 'two']}
                        renderInput={(params) => <TextField {...params} />}
                        {...fieldProps}
						{...remainingControlProps}
					/>
				)
			}}
		</Field>
	)
}
