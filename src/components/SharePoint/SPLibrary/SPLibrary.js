import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useLibrary } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SPTable } from '../SPTable'
import { FormikDialog } from 'Components'
import { DropZone } from '../DropZone'

export const SPLibrary = (props) => {
	const { listName } = props

	const { items, list, isLoading, isError, addDocuments } = useLibrary(listName)
	const [formOpen, setFormOpen] = useState(false)
	const [filesToUpload, setFilesToUpload] = useState([])
	const [dialogContent, setDialogContent] = useState(null)

	// console.log('{items, list} :>> ', { items, list })

	const handleFilesToUpload = (files) => {
		setFilesToUpload(files)
		setDialogContent(null)
	}

	const data = useMemo(() => {
		if (items.isLoading || items.isError) {
			return []
		}
		return items.data
	}, [items])

	const columns = useMemo(() => {
		if (list.isLoading || list.isError) {
			return []
		}
		return list.data.Columns
	}, [list])

	const initialState = []
	const columnFiltering = false

	const table = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	)

	const uploadDocuments = async (filesToUpload) => {
		addDocuments(filesToUpload)
		for (let i = 0; i < filesToUpload.length; i++) {

			// await fetch(
			//   APIurl +
			// 	"/_api/web/lists/getbytitle('Submitted Projects')/items(" +
			// 	listItem.Id +
			// 	")/AttachmentFiles/add(FileName='" +
			// 	filesToUpload[i].name +
			// 	"')",
			//   {
			// method: "POST",
			// headers: {
			//   accept: "application/json;odata=verbose",
			//   "content-type": "application/json;odata=verbose",
			//   "X-RequestDigest": (document.getElementById(
			// 	"__REQUESTDIGEST"
			//   )! as HTMLTextAreaElement).value,
			// },
			// body: filesToUpload[i],
			//   }
			// );
		}
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

	useEffect(() => {
		// console.log('filesToUpload :>> ', filesToUpload)
		return () => {}
	}, [filesToUpload])

	if (isLoading) {
		return <LinearProgress />
	}

	if (isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{list.error}
				<br />
				{items.error}
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
