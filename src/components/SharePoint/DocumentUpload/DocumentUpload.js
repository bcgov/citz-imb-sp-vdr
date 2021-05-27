import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog } from 'components/Reusable'
import React, { useState, useEffect } from 'react'
import { DropZone } from './DropZone/DropZone'

export const DocumentUpload = (props) => {
  const { listName, addDocuments, children, uploadCallback = () => {} } = props

  const [formOpen, setFormOpen] = useState(false)
  const [warningContent, setWarningContent] = useState(null)
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
      setWarningContent(
        <Alert severity={'error'}>
          <AlertTitle>Error</AlertTitle>Cannot upload 0 files
        </Alert>
      )

      setSubmitting(false)
      return
    }

    uploadDocuments(filesToUpload)
    setSubmitting(false)
    handleFormClose()
  }

  const handleFormClose = () => {
    setWarningContent(null)
    setFormOpen(false)
  }

  const handleUploadDocument = () => {
    setFormOpen(true)
  }

  useEffect(() => {
    if (filesToUpload.length) setWarningContent(null)
    return () => {}
  }, [filesToUpload])

  return (
    <>
      <Button
        color={'secondary'}
        onClick={handleUploadDocument}
        endIcon={<PublishIcon />}>
        {children}
      </Button>
      <FormikDialog
        open={formOpen}
        onSubmit={handleFormSubmit}
        close={handleFormClose}
        title={`Upload to ${listName}`}>
        {warningContent}
        <DropZone setAcceptedFiles={setFilesToUpload} />
      </FormikDialog>
    </>
  )
}
