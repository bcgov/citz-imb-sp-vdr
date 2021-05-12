import * as Yup from 'yup'

export const getDialogFields = (originalRow) => {
	let response = []

	const emailFields = [
		{
			name: 'TextValue',
			label: 'Subject Line',
			initialValue: originalRow.TextValue,
			validationSchema: Yup.string().required('Required'),
			control: 'input',
			required: true,
		},
		{
			name: 'MultiTextValue',
			label: 'Body',
			initialValue: originalRow.MultiTextValue,
			validationSchema: Yup.string().required('Required'),
			control: 'textarea',
			required: true,
		},
	]

	switch (originalRow.Key) {
		case 'TOS':
			response = [
				{
					name: 'TextValue',
					label: 'Title',
					initialValue: originalRow.TextValue,
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
				{
					name: 'NumberValue',
					label: 'Days until re-prompt',
					initialValue: originalRow.NumberValue,
					validationSchema: Yup.string().required('Required'),
					control: 'input',
					required: true,
				},
				{
					name: 'MultiTextValue',
					label: 'Body',
					initialValue: originalRow.MultiTextValue,
					validationSchema: Yup.string().required('Required'),
					control: 'textarea',
					required: true,
				},
			]
			break
		case 'addUserEmail':
			response = emailFields
			break
		case 'contactEmail':
			response = [
				{
					name: 'TextValue',
					label: 'Contact Email',
					initialValue: originalRow.TextValue,
					validationSchema: Yup.string()
						.required('Required')
						.email('Must be a valid email'),
					control: 'input',
					required: true,
				},
			]
			break
		case 'addQuestionEmail':
			response = emailFields
			break
		case 'newQuestionEmail':
			response = emailFields
			break
		case 'newAnswerEmail':
			response = emailFields
			break
		case 'removeUserEmail':
			response = emailFields
			break
		case 'updatedAnswerEmail':
			response = emailFields
			break
		case 'publicDocumentEmail':
			response = emailFields
			break
		case 'proponentDocumentEmail':
			response = emailFields
			break
		case 'newDocumentEmail':
			response = emailFields
			break
		case 'viewActivityLog':
			break
		default:
			response = []
	}
	return response
}
