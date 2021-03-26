import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import { useList } from 'components';
import { LinearProgress, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { SPTable } from '../SPTable';
import { FormikDialog } from 'components';
import { DropZone } from '../DropZone';

export const SPLibrary = (props) => {
	const {
		listName,
		uploadCallback = () => {},
		allowUpload = false,
		allowDelete = false,
		...tableProps
	} = props;

	const columnFiltering = false;

	const {
		items,
		columns: viewColumns,
		isLoading,
		isError,
		isFetching,
		error,
		deleteDocument,
		addDocuments,
	} = useList({ listName, isLibrary: true });

	const [formOpen, setFormOpen] = useState(false);
	const [filesToUpload, setFilesToUpload] = useState([]);
	const [dialogContent, setDialogContent] = useState(null);

	const handleFilesToUpload = (files) => {
		setFilesToUpload(files);
		setDialogContent(null);
	};

	const data = useMemo(() => {
		if (isLoading || isError) {
			return [];
		}
		return [...items];
	}, [isLoading, isError, items]);

	const columns = useMemo(() => {
		if (isLoading || isError) {
			return [];
		}

		let tempColumns = [...viewColumns];

		if (allowDelete) {
			tempColumns = [
				{
					Header: 'Delete',
					Footer: 'Delete',
					id: 'Delete',
					Cell: ({ row }) => {
						const clickHandler = () => {
							removeItem(row);
						};

						return (
							<IconButton
								color={'primary'}
								onClick={clickHandler}>
								<DeleteOutlineIcon />
							</IconButton>
						);
					},
				},
				...tempColumns,
			];
		}
		return tempColumns;
	}, [isLoading, isError, columns, allowDelete]);

	const table = useTable(
		{ columns, data },
		useFilters,
		useSortBy,
		usePagination
	);
	const handleUploadDocument = () => {
		setFormOpen(true);
	};

	let tableActions = [];

	if (allowUpload)
		tableActions.push(
			<IconButton
				onClick={handleUploadDocument}
				size={'small'}
				color={'secondary'}
				arial-label={'upload'}>
				<PublishIcon />
			</IconButton>
		);

	const removeItem = (row) => deleteDocument(row.original.Id);

	const uploadDocuments = async (filesToUpload) => {
		await addDocuments(filesToUpload);
		uploadCallback();
	};

	const handleFormSubmit = (values, { setSubmitting }) => {
		if (!filesToUpload.length) {
			setDialogContent(() => {
				return (
					<Alert severity={'error'}>
						<AlertTitle>Error</AlertTitle>Cannot upload 0 files
					</Alert>
				);
			});
			setSubmitting(false);
			return;
		}

		uploadDocuments(filesToUpload);
		setSubmitting(false);
		handleFormClose();
	};

	const handleFormClose = () => {
		setDialogContent(null);
		setFormOpen(false);
	};

	if (isLoading) {
		return <LinearProgress />;
	}

	if (isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{error}
			</Alert>
		);
	}
	return (
		<>
			<SPTable
				table={table}
				title={listName}
				columns={columns}
				columnFiltering={columnFiltering}
				tableActions={tableActions}
				{...tableProps}
			/>
			<FormikDialog
				open={formOpen}
				onSubmit={handleFormSubmit}
				close={handleFormClose}
				title={`Upload to ${listName}`}
				dialogContent={dialogContent}>
				<DropZone setAcceptedFiles={handleFilesToUpload} />
			</FormikDialog>
		</>
	);
};
