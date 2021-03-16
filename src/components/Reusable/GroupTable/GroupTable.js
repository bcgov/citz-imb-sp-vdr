import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import {
	useGroup,
	useLogAction,
	FormikDialog,
	CustomTable,
	SendConfirmationEmail,
	useConfig,
} from 'components';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//TODO: CRUD operations
//TODO: global filter

export const GroupTable = (props) => {
	const { groupId, proponent, addRecord = false, showTitle = true } = props;

	const [dialog, setDialog] = useState({
		open: false,
	});

	const logAction = useLogAction();
	const config = useConfig();
	console.log('config :>> ', config);

	const addUserEmail = config.items.filter(
		(item) => item.Key === 'addUserEmail'
	)[0];
	const removeUserEmail = config.items.filter(
		(item) => item.Key === 'removeUserEmail'
	)[0];
	const contactEmail = config.items.filter(
		(item) => item.Key === 'contactEmail'
	)[0];

	const proponentGroup = useGroup({ groupId });

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
	}, [
		proponentGroup.isLoading,
		proponentGroup.isError,
		proponentGroup.isMutating,
	]);

	const data = useMemo(() => {
		if (proponentGroup.isLoading || proponentGroup.isError) return [];
		return proponentGroup.members;
	}, [
		proponentGroup.isLoading,
		proponentGroup.isError,
		proponentGroup.isMutating,
	]);

	const tableDataOptions = useTable(
		{ columns, data, initialState: {} },
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
				try {
					await proponentGroup.addMember(values);
					logAction(
						`added ${members.join('; ')} to ${proponent} group`
					);
					values.members.map(async (member) => {
						await SendConfirmationEmail({
							addresses: member.Key,
							proponent,
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

	const removeItemDialog = ({ original }) => {
		setDialog({
			dialogContent: (
				<Alert>
					<AlertTitle>Remove {original.Title} from Group?</AlertTitle>
					{original.Title} will no longer have access to this site
				</Alert>
			),
			onSubmit: async (values, { setSubmitting }) => {
				try {
					await proponentGroup.removeMember(original.Id);
					logAction(
						`removed ${original.Title} from ${proponent} group`
					);
					await SendConfirmationEmail({
						addresses: contactEmail.TextValue,
						proponent,
						subject: removeUserEmail.TextValue,
						body: removeUserEmail.MultiTextValue,
						additionalReplacementPairs: [
							{
								searchvalue: /\[UserName\]/g,
								newvalue: original.Title,
							},
						],
						contactEmail,
					});
					logAction(
						`sent ${removeUserEmail.Title} to ${contactEmail.TextValue}`
					);
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
			title: 'Remove Member',
		});
	};

	const tableOptions = {
		showTitle,
		addRecord,
		addItemCallback: addItemDialog,
		tableDataOptions,
		columns,
	};

	if (proponentGroup.isLoading) return <LinearProgress />;

	return (
		<>
			<CustomTable {...tableOptions} />
			<FormikDialog {...dialog} />
		</>
	);
};
