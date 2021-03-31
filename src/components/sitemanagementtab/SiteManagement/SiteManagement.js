import React, { useState, useReducer, useEffect } from 'react';
import { useLogAction, FormikDialog } from 'components';
import { ListItem, List } from '@material-ui/core';
import * as Yup from 'yup';
import { GetListItems, UpdateListItem } from 'components/ApiCalls';
import { useSnackbar } from 'notistack';
import { ActivityLog } from '../ActivityLog/ActivityLog';
import { useQueryClient } from 'react-query';

export const SiteManagement = () => {
	const listName = 'Config';
	const clientQuery = useQueryClient();

	const [listItems, setListItems] = useState([]);
	const [items, setItems] = useState({});
	const { enqueueSnackbar } = useSnackbar();
	const LogAction = useLogAction();

	const initialDialogProps = {
		fields: [],
		onSubmit: () => {},
		open: false,
		close: () => {},
		title: '',
		instructions: '',
	};

	const handleSave = async (key, newValues, setSubmitting) => {
		try {
			await UpdateListItem({ listName, items: newValues });
			dialogDispatch('reset');
			LogAction(`updated '${key}'`);
		} catch (error) {
			console.error('Error in handleSave', error);
			enqueueSnackbar(`${key} did not update: ${error}`, {
				variant: 'error',
			});
			setSubmitting(false);
		} finally {
			clientQuery.invalidateQueries('Config', {refetchInactive:true});
		}
	};

	const dialogReducer = (state, action) => {
		switch (action) {
			case 'TOS':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Title',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'NumberValue',
							label: 'Days until re-prompt',
							initialValue: items[action].NumberValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'addUserEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'contactEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Contact Email',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string()
								.required('Required')
								.email('Must be a valid email'),
							control: 'input',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'addQuestionEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'newQuestionEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'newAnswerEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id;
						handleSave(action, values, setSubmitting);
					},
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				};
			case 'reset':
				return initialDialogProps;
			case 'viewActivityLog':
				return {
					open: true,
					close: () => {
						dialogDispatch('reset');
					},
					title: 'Activity Log',
					dialogContent: <ActivityLog />,
					fullScreen: true,
					cancelButtonText: 'Close',
				};
			default:
				console.warn(`${action} not defined`);
				return state;
		}
	};

	const [dialogProps, dialogDispatch] = useReducer(
		dialogReducer,
		initialDialogProps
	);

	const getItems = async () => {
		const configItems = await GetListItems({ listName });
		let itemRenders = configItems.map((item) => {
			return (
				<ListItem
					key={item.Key}
					onClick={() => {
						dialogDispatch(item.Key);
					}}
					id={item.Key}
					button
					divider>
					Edit {item.Title}
				</ListItem>
			);
		});

		itemRenders.push(
			<ListItem
				key={'viewActivityLog'}
				onClick={() => {
					dialogDispatch('viewActivityLog');
				}}
				id={'viewActivityLog'}
				button
				divider>
				View Activity Log
			</ListItem>
		);

		let itemObject = {};

		for (let i = 0; i < configItems.length; i++) {
			itemObject[configItems[i].Key] = {
				Key: configItems[i].Key,
				MultiTextValue: configItems[i].MultiTextValue,
				NumberValue: configItems[i].NumberValue,
				TextValue: configItems[i].TextValue,
				YesNoValue: configItems[i].YesNoValue,
				Title: configItems[i].Title,
				Instructions: configItems[i].Instructions,
				Id: configItems[i].Id,
			};
		}
		setItems(itemObject);
		setListItems(itemRenders);
	};

	useEffect(() => {
		getItems();
		return () => {};
	}, []);

	return (
		<>
			<List>{listItems.map((item) => item)}</List>
			<FormikDialog {...dialogProps} />
		</>
	);
};
