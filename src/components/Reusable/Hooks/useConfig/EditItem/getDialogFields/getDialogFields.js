import * as Yup from 'yup'

export const getDialogFields = (originalRow) => {
	let response = []

	switch (originalRow.Key) {
        case 'TOS':
            console.log('originalRow :>> ', originalRow)

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
		default:
			response = []
	}

	// const dialogReducer = (state, action) => {
	//     	switch (action) {
	//     		case 'TOS':
	//     			return {
	//     				fields:
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'addUserEmail':
	//     			return {
	//     				fields: [
	//     					{
	//     						name: 'TextValue',
	//     						label: 'Subject Line',
	//     						initialValue: items[action].TextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'input',
	//     						required: true,
	//     					},
	//     					{
	//     						name: 'MultiTextValue',
	//     						label: 'Body',
	//     						initialValue: items[action].MultiTextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'textarea',
	//     						required: true,
	//     					},
	//     				],
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'contactEmail':
	//     			return {
	//     				fields: [
	//     					{
	//     						name: 'TextValue',
	//     						label: 'Contact Email',
	//     						initialValue: items[action].TextValue,
	//     						validationSchema: Yup.string()
	//     							.required('Required')
	//     							.email('Must be a valid email'),
	//     						control: 'input',
	//     						required: true,
	//     					},
	//     				],
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'addQuestionEmail':
	//     			return {
	//     				fields: [
	//     					{
	//     						name: 'TextValue',
	//     						label: 'Subject Line',
	//     						initialValue: items[action].TextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'input',
	//     						required: true,
	//     					},
	//     					{
	//     						name: 'MultiTextValue',
	//     						label: 'Body',
	//     						initialValue: items[action].MultiTextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'textarea',
	//     						required: true,
	//     					},
	//     				],
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'newQuestionEmail':
	//     			return {
	//     				fields: [
	//     					{
	//     						name: 'TextValue',
	//     						label: 'Subject Line',
	//     						initialValue: items[action].TextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'input',
	//     						required: true,
	//     					},
	//     					{
	//     						name: 'MultiTextValue',
	//     						label: 'Body',
	//     						initialValue: items[action].MultiTextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'textarea',
	//     						required: true,
	//     					},
	//     				],
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'newAnswerEmail':
	//     			return {
	//     				fields: [
	//     					{
	//     						name: 'TextValue',
	//     						label: 'Subject Line',
	//     						initialValue: items[action].TextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'input',
	//     						required: true,
	//     					},
	//     					{
	//     						name: 'MultiTextValue',
	//     						label: 'Body',
	//     						initialValue: items[action].MultiTextValue,
	//     						validationSchema: Yup.string().required('Required'),
	//     						control: 'textarea',
	//     						required: true,
	//     					},
	//     				],
	//     				onSubmit: (values, { setSubmitting }) => {
	//     					values.Id = items[action].Id
	//     					handleSave(action, values, setSubmitting)
	//     				},
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: items[action].Title,
	//     				instructions: items[action].Instructions,
	//     			}
	//     		case 'reset':
	//     			return initialDialogProps
	//     		case 'viewActivityLog':
	//     			return {
	//     				open: true,
	//     				close: () => {
	//     					dialogDispatch('reset')
	//     				},
	//     				title: 'Activity Log',
	//     				dialogContent: <ActivityLog />,
	//     				fullScreen: true,
	//     				cancelButtonText: 'Close',
	//     			}
	//     		default:
	//     			console.warn(`${action} not defined`)
	//     			return state
	//     	}
	// }

	return response
}
