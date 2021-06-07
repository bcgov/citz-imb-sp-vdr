import { Alert } from '@material-ui/lab'
import { useCurrentUser, useEmail, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'
import React from 'react'

export const ProponentLibrary = () => {
  const currentUser = useCurrentUser()
  const { sendEmailToAllProponents, sendEmailToSiteContact } = useEmail()
  const logAction = useLogAction()

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  const listName = currentUser.proponent

  const uploadCallback = async (result, fileNames) => {
    if (result === 'success') {
      logAction(`uploaded ${fileNames}`)
      try {
        await sendEmailToAllProponents('proponentDocumentEmail')

        await sendEmailToSiteContact('newDocumentEmail')

        logAction(`successfully sent email notifications`)
      } catch (error) {
        console.error(error)
        logAction(`failed to send email notifications`, { variant: 'error' })
      }
    } else {
      logAction(`failed to upload ${fileNames}`, { variant: 'error' })
    }
  }

  const deleteCallback = async (result, fileName) => {
    if (result === 'success') {
      logAction(`deleted ${fileName}`)
    } else {
      logAction(`failed to delete ${fileName}`, { variant: 'error' })
    }
  }

  return (
    <SPList
      uploadText='Submit a document'
      listName={listName}
      title={'Submitted Documents'}
      allowUpload={true}
      allowDelete={true}
      uploadCallback={uploadCallback}
      deleteCallback={deleteCallback}
      columnFiltering={true}
    />
  )
}
