import { Button, IconButton, LinearProgress } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import PublishIcon from '@material-ui/icons/Publish'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog, useList } from 'components'
import React, { useMemo, useState } from 'react'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { DropZone } from './DocumentUpload/DropZone/DropZone'
import { SPTable } from '../SPTable/SPTable'

export const SPLibrary = (props) => {
  const {
    listName,
    uploadCallback = () => {},
    deleteCallback = () => {},
    allowUpload = false,
    uploadText = 'Upload',
    allowDelete = false,
    ...tableProps
  } = props

  const {
    items,
    columns: viewColumns,
    isLoading,
    isError,
    isFetching,
    error,
    deleteDocument,
    addDocuments,
  } = useList({ listName, isLibrary: true })

  const [formOpen, setFormOpen] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [dialogContent, setDialogContent] = useState(null)

  const handleFilesToUpload = (files) => {
    setFilesToUpload(files)
    setDialogContent(null)
  }

  const data = useMemo(() => {
    if (isLoading || isError) {
      return []
    }
    return [...items]
  }, [isLoading, isError, items])

  const columns = useMemo(() => {
    if (isLoading || isError) {
      return []
    }

    let tempColumns = [...viewColumns]

    const removeItem = (row) => deleteDocument(row.original.Id)

    if (allowDelete) {
      tempColumns = [
        {
          Header: 'Delete',
          Footer: 'Delete',
          id: 'Delete',
          Cell: ({ row }) => {
            const clickHandler = () => {
              const fileName = row.original.File.Name
              try {
                removeItem(row)
                deleteCallback('success', fileName)
              } catch (error) {
                deleteCallback('fail', fileName)
              }
            }

            return (
              <IconButton color={'primary'} onClick={clickHandler}>
                <DeleteOutlineIcon />
              </IconButton>
            )
          },
        },
        ...tempColumns,
      ]
    }
    return tempColumns
  }, [isLoading, isError, viewColumns, allowDelete])

  const table = useTable(
    { columns, data },
    useFilters,
    useSortBy,
    usePagination
  )
  const handleUploadDocument = () => {
    setFormOpen(true)
  }

  let tableActions = []

  if (allowUpload)
    tableActions.push(
      <Button
        color={'secondary'}
        onClick={handleUploadDocument}
        endIcon={<PublishIcon />}>
        {uploadText}
      </Button>
    )

  const uploadDocuments = async (filesToUpload) => {
    const fileNames = filesToUpload.map((file) => file.name).join('; ')
    try {
      await addDocuments(filesToUpload)
      uploadCallback('success', fileNames)
    } catch (error) {
      console.error(error)
      uploadCallback('fail', fileNames)
    }
  }

  const handleFormSubmit = (values, { setSubmitting }) => {
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

    uploadDocuments(filesToUpload)
    setSubmitting(false)
    handleFormClose()
  }

  const handleFormClose = () => {
    setDialogContent(null)
    setFormOpen(false)
  }

  if (isLoading) {
    return <LinearProgress />
  }

  if (isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }
  return (
    <>
      <SPTable
        table={table}
        title={listName}
        columns={columns}
        tableActions={tableActions}
        isFetching={isLoading || isFetching}
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
  )
}
