import React from 'react'
import { Field } from 'formik'
import { PeoplePicker } from 'Components'

export const PeoplePickerFormikControl = (props) => {
	const { name, ...remainingControlProps } = props

	return (
		<Field name={name}>
			{(fieldProps) => {
				return (
					<PeoplePicker
						setFieldValue={fieldProps.form.setFieldValue}
						name={name}
						{...fieldProps}
						{...remainingControlProps}
					/>
				)
			}}
		</Field>
	)
}
