import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import {
	useGroup,
	useLogAction,
	FormikDialog,
	SendConfirmationEmail,
	useConfig,
} from 'components';
import { SPTable } from 'components/SharePoint';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { removeItemsDialogOptions } from './removeItemsDialogOptions/removeItemsDialogOptions';

//TODO: CRUD operations
//TODO: global filter

export const GroupTable = (props) => {
	const { groupId, proponentName } = props;

	const [dialog, setDialog] = useState({
		open: false,
	});

	const logAction = useLogAction();
	const config = useConfig();

	const proponentGroup = useGroup({ groupId });

	const removeItemDialog = useCallback(
		({ original }) => {
			removeItemsDialogOptions({
				original,
				setDialog,
				proponentGroup,
				logAction,
				proponentName,
				config,
			});
		},
		[
			config,
			logAction,
			// proponentGroup,
			proponentName,
		]
	);

	const columns = useMemo(() => {
		if (proponentGroup.isLoading || proponentGroup.isError) return [];
		return [
			{
				Header: 'Title',
				accessor: 'Title',
				Filter: true,
				disableFilters: true,
			},
			{
				Header: 'E-mail',
				accessor: 'Email',
				Filter: true,
				disableFilters: true,
			},
			{
				Header: 'Remove',
				id: 'removeMember',
				Cell: ({ row }) => {
					const clickHandler = () => {
						removeItemDialog(row);
					};

					return (
						<IconButton color={'primary'} onClick={clickHandler}>
							<DeleteOutlineIcon />
						</IconButton>
					);
				},
			},
		];
	}, [proponentGroup.isLoading, proponentGroup.isError, removeItemDialog]);

	const data = useMemo(() => {
		if (proponentGroup.isLoading || proponentGroup.isError) return [];
		// console.log('data proponentGroup :>> ', proponentGroup);
		return [...proponentGroup.members];
	}, [
		proponentGroup.isLoading,
		proponentGroup.isError,
		proponentGroup.members,
	]);

	const table = useTable(
		{ columns, data },
		useFilters,
		useSortBy,
		usePagination
	);

	const addItemDialog = () => {
		setDialog({
			fields: [
				{
					name: 'members',
					label: 'Members',
					initialValue: '',
					control: 'peoplepicker',
				},
			],
			onSubmit: async (values, { setSubmitting }) => {
				const members = values.members.map(
					(member) => member.DisplayText
				);
				const addUserEmail = config.filter(
					(item) => item.Key === 'addUserEmail'
				)[0];

				const contactEmail = config.filter(
					(item) => item.Key === 'contactEmail'
				)[0];

				console.log('contactEmail :>> ', contactEmail);
				try {
					await proponentGroup.addMember(values);
					logAction(
						`added ${members.join('; ')} to ${proponentName} group`
					);
					values.members.map(async (member) => {
						await SendConfirmationEmail({
							addresses: member.Key,
							proponent: proponentName,
							subject: addUserEmail.TextValue,
							body: addUserEmail.MultiTextValue,
							additionalReplacementPairs: [
								{
									searchvalue: /\[AddresseeName\]/g,
									newvalue: member.DisplayText,
								},
							],
							contactEmail,
						});
						logAction(
							`sent ${addUserEmail.Title} to ${members.join(
								'; '
							)}`
						);
					});

					setSubmitting(false);
					setDialog({ open: false });
				} catch (error) {
					throw error;
				}
			},
			open: true,
			close: () => {
				setDialog({ open: false });
			},
			title: 'Add Member',
		});
	};

	const tableActions = [
		<IconButton
			aria-label='add'
			color={'secondary'}
			onClick={addItemDialog}>
			<AddIcon />
		</IconButton>,
	];

	if (proponentGroup.isLoading) return <LinearProgress />;

	if (proponentGroup.isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{proponentGroup.error}
			</Alert>
		);
	}

	return (
		<>
			<SPTable
				table={table}
				columns={columns}
				title={proponentGroup.group.Title}
				tableActions={tableActions}
			/>
			<FormikDialog {...dialog} />
		</>
	);
};
