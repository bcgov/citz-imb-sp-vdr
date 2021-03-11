import React from 'react'
import { InputFormikControl } from './Input/InputFormikControl'
import { TextAreaFormikControl } from './TextArea/TextAreaFormikControl'
import { SelectFormikControl } from './Select/SelectFormikControl'
import { RadioFormikControl } from './Radio/RadioFormikControl'
import { CheckboxGroupFormikControl } from './CheckboxGroup/CheckboxGroupFormikControl'
import { PeoplePickerFormikControl } from './PeoplePicker/PeoplePickerFormikControl'
import { HiddenFormikControl } from './Hidden/HiddenFormikControl'

export const FormikControls = (props) => {
	const { control, ...rest } = props

	let returnedControl

	switch (control) {
		case 'input':
			returnedControl = <InputFormikControl {...rest} />
			break
		case 'textarea':
			returnedControl = <TextAreaFormikControl {...rest} />
			break
		case 'select':
			returnedControl = <SelectFormikControl {...rest} />
			break
		case 'radio':
			returnedControl = <RadioFormikControl {...rest} />
			break
		case 'checkbox':
			returnedControl = <CheckboxGroupFormikControl {...rest} />
			break
		case 'peoplepicker':
			returnedControl = <PeoplePickerFormikControl {...rest} />
			break
		case 'hidden':
			returnedControl = <HiddenFormikControl {...rest} />
			break
		case 'autocomplete':
			// return <AutoCompleteFormikControl {...rest} />
			break
		case 'date':
		default:
			returnedControl = null
	}
	return returnedControl
}
