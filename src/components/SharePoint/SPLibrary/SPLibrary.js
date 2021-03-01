import React, { Fragment, useMemo, useState, useContext } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useLibrary } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SPTable } from '../SPTable'
import { FormikDialog, ConfigContext, ProponentsContext } from 'Components'
import { DropZone } from '../DropZone'

export const SPLibrary = (props) => {
	const { listName } = props
	const initialState = []
	const columnFiltering = false

	const library = useLibrary(listName)
	const [formOpen, setFormOpen] = useState(false)
	const [filesToUpload, setFilesToUpload] = useState([])
	const [dialogContent, setDialogContent] = useState(null)
	const config = useContext(ConfigContext)
	const proponents = useContext(ProponentsContext)

	// console.log('library :>> ', library)

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

	const uploadDocuments = async (filesToUpload) => {
		await library.addDocuments(filesToUpload)
		//! send email is in the wrong place, this component is more generic than that
		await proponents.sendEmailToProponents({
			subject: config.items.publicDocumentEmail.TextValue,
			body: config.items.publicDocumentEmail.MultiTextValue,
		})
	}

	const handleUploadDocument = () => {
		setFormOpen(true)
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
		<Fragment>
			<SPTable
				table={table}
				listName={listName}
				columns={columns}
				columnFiltering={columnFiltering}
				handleUpload={handleUploadDocument}
			/>
			<FormikDialog
				open={formOpen}
				onSubmit={handleFormSubmit}
				close={handleFormClose}
				title={`Upload to ${listName}`}
				dialogContent={dialogContent}>
				<DropZone setAcceptedFiles={handleFilesToUpload} />
			</FormikDialog>
		</Fragment>
	)
}
