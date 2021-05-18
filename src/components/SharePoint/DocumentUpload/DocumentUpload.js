import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog } from 'components/Reusable'
import React, { useState } from 'react'
import { DropZone } from './DropZone/DropZone'

export const DocumentUpload = (props) => {
  const { listName, addDocuments, uploadCallback } = props

  const [formOpen, setFormOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)
  const [filesToUpload, setFilesToUpload] = useState([])

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

  const handleFilesToUpload = (files) => {
    setFilesToUpload(files)
    setDialogContent(null)
  }

  const handleUploadDocument = () => {
    setFormOpen(true)
  }

  return (
    <>
      <Button
        color={'secondary'}
        onClick={handleUploadDocument}
        endIcon={<PublishIcon />}>
        upload
      </Button>
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
