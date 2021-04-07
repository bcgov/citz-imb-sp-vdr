import { FormikDialog } from 'components';
import React, { useState } from 'react';
import * as Yup from 'yup';

export const FormikTest = ({ open, close }) => {
	const [peoplePicker, setPeoplePicker] = useState();

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
			control: 'peoplepicker',
			getUserInfo: (userInfo) => {
				setPeoplePicker(userInfo);
			},
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
	];

	const onSubmit = (values, { setSubmitting }) => {
		values.peoplepicker = peoplePicker;
		setTimeout(() => {
			setSubmitting(false);
			alert(JSON.stringify(values, null, 2));
		}, 500);
	};

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
				fullScreen={true}
			/>
		</div>
	);
};
