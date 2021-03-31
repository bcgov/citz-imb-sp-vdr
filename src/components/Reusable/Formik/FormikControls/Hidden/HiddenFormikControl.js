import { Field } from 'formik'
import React from 'react'

export const HiddenFormikControl = (props) => {
	const { name, ...rest } = props

	return <Field name={name} type='hidden' {...rest} />
}
