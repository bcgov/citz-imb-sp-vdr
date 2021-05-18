import { Alert } from '@material-ui/lab'
import {
  useCurrentUser,
  useProponents,
  useConfig,
  useLogAction,
  SendConfirmationEmail,
} from 'components'
// import { SPLibrary } from 'components/SharePoint'
import React from 'react'

export const ProponentLibrary = () => {
  const currentUser = useCurrentUser()
  const proponents = useProponents()
  const config = useConfig()
  const logAction = useLogAction()

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  const listName = currentUser.proponent

  const proponentDocumentEmail = config.items.filter(
    (item) => item.Key === 'proponentDocumentEmail'
  )[0]
  const VICOManagerDocumentEmail = config.items.filter(
    (item) => item.Key === 'newDocumentEmail'
  )[0]
  const contactEmail = config.items.filter(
    (item) => item.Key === 'contactEmail'
  )[0]

  const uploadCallback = async (result, fileNames) => {
    if (result === 'success') {
      logAction(`uploaded ${fileNames}`)
      try {
        await proponents.sendEmailToProponents({
          subject: proponentDocumentEmail.TextValue,
          body: proponentDocumentEmail.MultiTextValue,
        })
        await SendConfirmationEmail({
          addresses: contactEmail.TextValue,
          proponent: currentUser.proponent,
          subject: VICOManagerDocumentEmail.TextValue,
          body: VICOManagerDocumentEmail.MultiTextValue,
          contactEmail,
        })
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

  // return (
    // <SPLibrary
    //   uploadText='Submit a document'
    //   listName={listName}
    //   title={'Submitted Documents'}
    //   allowUpload={true}
    //   allowDelete={true}
    //   uploadCallback={uploadCallback}
    //   deleteCallback={deleteCallback}
    // />
  // )
}
