import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog } from 'components/Reusable'
import { useSendNotificationDefault, useCurrentUser } from 'components/Hooks'
import React, { useState, useEffect } from 'react'
import { DropZone } from './DropZone/DropZone'

export const DocumentUpload = (props) => {
  const { addDocuments, children, uploadCallback = () => { }, title = 'Upload', showNotificationSwitch = true } = props

  const [formOpen, setFormOpen] = useState(false)
  const [warningContent, setWarningContent] = useState(null)
  const [filesToUpload, setFilesToUpload] = useState([])
  const currentUser = useCurrentUser()

  let fields = useSendNotificationDefault('publicDocumentEmail')

  if (!currentUser.isOwner || !showNotificationSwitch) fields = []

  const uploadDocuments = async (filesToUpload, values) => {
    const fileNames = filesToUpload.map((file) => file.name)
    try {
      await addDocuments(filesToUpload)
      uploadCallback('success', fileNames, values)
    } catch (error) {
      console.error(error)
      uploadCallback('fail', fileNames, values)
    }
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (!filesToUpload.length) {
      setWarningContent(
        <Alert severity={'error'}>
          <AlertTitle>Error</AlertTitle>Cannot upload 0 files
        </Alert>
      )

      setSubmitting(false)
      return
    }

    await uploadDocuments(filesToUpload, values)
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
    return () => { }
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
        title={title}
        fields={fields}>
        {warningContent}
        <DropZone setAcceptedFiles={setFilesToUpload} />
      </FormikDialog>
    </>
  )
}
