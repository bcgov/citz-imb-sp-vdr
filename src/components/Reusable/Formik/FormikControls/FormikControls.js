import React from 'react'
import { InputFormikControl } from './Input/InputFormikControl'
import { TextAreaFormikControl } from './TextArea/TextAreaFormikControl'
import { SelectFormikControl } from './Select/SelectFormikControl'
import { RadioFormikControl } from './Radio/RadioFormikControl'
import { CheckboxGroupFormikControl } from './CheckboxGroup/CheckboxGroupFormikControl'
import { PeoplePickerFormikControl } from './PeoplePicker/PeoplePickerFormikControl'

export const FormikControls = (props) => {
	const { control, ...rest } = props

	switch (control) {
		case 'input':
			return <InputFormikControl {...rest} />
		case 'textarea':
			return <TextAreaFormikControl {...rest} />
		case 'select':
			return <SelectFormikControl {...rest} />
		case 'radio':
			return <RadioFormikControl {...rest} />
		case 'checkbox':
			return <CheckboxGroupFormikControl {...rest} />
		case 'peoplepicker':
			return <PeoplePickerFormikControl {...rest} />
		case 'date':
		default:
			return null
	}
}
