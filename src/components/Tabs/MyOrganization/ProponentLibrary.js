import { Alert } from '@material-ui/lab'
import { useConfig, useCurrentUser, useEmail, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'
import { useMemo } from 'react'

export const ProponentLibrary = () => {
  const currentUser = useCurrentUser()
  const { sendEmailToCurrentProponentMembers, sendEmailToSiteContact } =
    useEmail()
  const logAction = useLogAction()
  const config = useConfig()

  const allowUpload = config.items.filter(item => item.Key === 'allowSubmissions')[0].YesNoValue

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'Modified', desc: true }] }
  }, [])

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  const listName = currentUser.proponent

  const uploadCallback = async (result, fileNames) => {
    if (result === 'success') {
      fileNames.map(fileName => {
        logAction(`uploaded ${fileName}`, {
          snackbar: false,
        })
      })
      logAction(`uploaded ${fileNames.length} files`, {
        snackbarOnly: true,
      })
      try {
        await sendEmailToCurrentProponentMembers('proponentDocumentEmail', {
          currentUser,
        })
        await sendEmailToSiteContact('newDocumentEmail', {
          proponentId: currentUser.proponent,
        })
      } catch (error) {
        console.error(error)
        logAction(`failed to send email notifications`, { variant: 'error' })
      }
    } else {
      logAction(`failed to upload ${fileNames}`, { variant: 'error' })
    }
  }

  const deleteCallback = async (isSuccess, fileName) => {

    if (isSuccess) {
      logAction(`deleted ${fileName}`)
      sendEmailToCurrentProponentMembers('ProponentDeleteDocumentEmail', {
        currentUser,
      })
    } else {
      logAction(`failed to delete ${fileName}`, { variant: 'error' })
    }
  }



  return (
    <SPList
      uploadText='Submit a document'
      listName={listName}
      title={'Submitted Documents'}
      allowUpload={allowUpload}
      allowDelete={allowUpload}
      uploadCallback={uploadCallback}
      deleteCallback={deleteCallback}
      columnFiltering={true}
      noRecordsText={'Your organization has not submitted any documents yet'}
      initialState={initialState}
    />
  )
}
