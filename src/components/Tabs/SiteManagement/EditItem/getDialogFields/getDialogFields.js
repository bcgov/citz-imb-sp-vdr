import * as Yup from 'yup'

export const getDialogFields = (originalRow) => {
	let fields = []

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
			fields = [
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
			fields = emailFields
			break
		case 'contactEmail':
			fields = [
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
			fields = emailFields
			break
		case 'newQuestionEmail':
			fields = emailFields
			break
		case 'newAnswerEmail':
			fields = emailFields
			break
		case 'removeUserEmail':
			fields = emailFields
			break
		case 'updatedAnswerEmail':
			fields = emailFields
			break
		case 'publicDocumentEmail':
			fields = emailFields
			break
		case 'proponentDocumentEmail':
			fields = emailFields
			break
		case 'newDocumentEmail':
			fields = emailFields
			break
		case 'viewActivityLog':
			break
		default:
			fields = []
	}
	
	return fields
}
