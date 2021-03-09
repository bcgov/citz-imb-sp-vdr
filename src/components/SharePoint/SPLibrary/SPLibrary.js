import React, { useMemo, useState, useContext } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useLibrary } from 'components'
import { LinearProgress, IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import PublishIcon from '@material-ui/icons/Publish'
import { SPTable } from '../SPTable'
import { FormikDialog, useConfig, useProponents } from 'components'
import { DropZone } from '../DropZone'

export const SPLibrary = (props) => {
	const { listName } = props

	const columnFiltering = false

	const library = useLibrary(listName)
	const [formOpen, setFormOpen] = useState(false)
	const [filesToUpload, setFilesToUpload] = useState([])
	const [dialogContent, setDialogContent] = useState(null)
	const config = useConfig()
	const proponents = useProponents()

	const handleFilesToUpload = (files) => {
		setFilesToUpload(files)
		setDialogContent(null)
	}

	const data = useMemo(() => {
		if (library.isLoading || library.isError) {
			return []
		}
		return [...library.items]
	}, [library.isLoading, library.isError, library.isMutating])

	const columns = useMemo(() => {
		if (library.isLoading || library.isError) {
			return []
		}
		return library.list.Columns
	}, [library.isLoading, library.isError])

	const table = useTable(
		{ columns, data },
		useFilters,
		useSortBy,
		usePagination
	)
	const handleUploadDocument = () => {
		console.log('handleUploadDocument')
		setFormOpen(true)
	}

	const tableActions = [
		<IconButton
			onClick={handleUploadDocument}
			size={'small'}
			color={'secondary'}
			arial-label={'upload'}>
			<PublishIcon />
		</IconButton>,
	]

	const uploadDocuments = async (filesToUpload) => {
		await library.addDocuments(filesToUpload)
		//! send email is in the wrong place, this component is more generic than that
		await proponents.sendEmailToProponents({
			subject: config.items.publicDocumentEmail.TextValue,
			body: config.items.publicDocumentEmail.MultiTextValue,
		})
	}

	const handleFormSubmit = async (values, { setSubmitting }) => {
		if (!filesToUpload.length) {
			setDialogContent(() => {
				return (
					<Alert severity={'error'}>
						<AlertTitle>Error</AlertTitle>Cannot upload 0 files
					</Alert>
				)
			})
			setSubmitting(false)
			return
		}

		await uploadDocuments(filesToUpload)
		setSubmitting(false)
		handleFormClose()
	}

	const handleFormClose = () => {
		setDialogContent(null)
		setFormOpen(false)
	}

	if (library.isLoading) {
		return <LinearProgress />
	}

	if (library.isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{library.list.error}
				<br />
				{library.items.error}
			</Alert>
		)
	}
	return (
		<>
			<SPTable
				table={table}
				listName={listName}
				columns={columns}
				columnFiltering={columnFiltering}
				tableActions={tableActions}
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
	)
}
