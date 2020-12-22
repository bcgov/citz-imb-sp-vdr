import React from 'react'
import { Field } from 'formik'

export const HiddenFormikControl = (props) => {
	const { name, ...rest } = props

	return <Field name={name} type='hidden' {...rest} />
}
