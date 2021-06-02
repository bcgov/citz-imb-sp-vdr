import { PeoplePicker } from 'components/Hooks'
import { Field } from 'formik'
import React from 'react'

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
