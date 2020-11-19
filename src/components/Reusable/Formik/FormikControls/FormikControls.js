import React from 'react'
import { Input } from './Input/Input'
import { TextArea } from './TextArea/TextArea'
import { Select } from './Select/Select'
import { Radio } from './Radio/Radio'
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup'
import { PeoplePicker } from './PeoplePicker/PeoplePicker'

export const FormikControls = (props) => {
	const { control, ...rest } = props

	switch (control) {
		case 'input':
			return <Input {...rest} />
		case 'textarea':
			return <TextArea {...rest} />
		case 'select':
			return <Select {...rest} />
		case 'radio':
			return <Radio {...rest} />
		case 'checkbox':
			return <CheckboxGroup {...rest} />
		case 'peoplepicker':
			console.log('rest', rest)
			const { getUserInfo, label, name, required } = rest
			return (
				<PeoplePicker
					label={label}
					name={name}
					//required={required}
					getUserInfo={getUserInfo}
				/>
			)
		case 'date':
		default:
			return null
	}
}
