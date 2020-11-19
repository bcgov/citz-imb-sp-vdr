import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { FormikDialog } from 'Components'
import * as Yup from 'yup'

export const FormikTest = ({open, close}) => {
	const fields = [
		{
			name: 'title',
			label: 'Title',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			control: 'input',
			required: true,
		},
		{
			name: 'peoplepicker',
			label: 'People Picker',
			initialValue: '',
			// validationSchema: Yup.string().required('Required'),
			control: 'peoplepicker',
			getUserInfo: (userInfo)=>{console.log('userInfo', userInfo)}
		},
		{
			name: 'description',
			label: 'Description',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			control: 'textarea',
			required: true,
		},
		{
			name: 'select',
			label: 'Select',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			control: 'select',
			options: [
				{ key: 'Pick A Value', value: '' },
				{ key: 'first', value: 'first' },
				{ key: 'second', value: 'second' },
				{ key: 'third', value: 'third' },
			],
			required: true,
		},
		// {
		// 	name: 'checkbox',
		// 	label: 'Checkbox',
		// 	initialValue: [],
		// 	validationSchema: Yup.array().required('Required'),
		// 	control: 'checkbox',
		// 	options: [
		// 		{ key: 'Option 1', value: 'Option 1' },
		// 		{ key: 'Option 2', value: 'Option 2' },
		// 		{ key: 'Option 3', value: 'Option 3' },
		// 	],
		// },
		{
			name: 'radio',
			label: 'Radio',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			control: 'radio',
			options: [
				{ key: 'first', value: 'first' },
				{ key: 'second', value: 'second' },
				{ key: 'third', value: 'third' },
			],
			required: true,
		},
	]

	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			alert(JSON.stringify(values, null, 2))
		}, 500)
	}

	return (
		<div>
			<FormikDialog
				fields={fields}
				onSubmit={onSubmit}
				open={open}
				close={close}
				title={'Formik Dialog Form'}
				instructions={'this is how you do it'}
				fullWidth={true}
				//fullScreen={true}
			/>
		</div>
	)
}
