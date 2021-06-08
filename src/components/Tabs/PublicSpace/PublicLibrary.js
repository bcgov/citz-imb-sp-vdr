import { useCurrentUser, useEmail, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'

export const PublicLibrary = () => {
  const listName = 'Documents'

  const logAction = useLogAction()
  const currentUser = useCurrentUser()
  const { sendEmailToAllProponents } = useEmail()

  const uploadCallback = async (result, fileNames) => {
    if (result === 'success') {
      logAction(`uploaded ${fileNames}`)
      await sendEmailToAllProponents('publicDocumentEmail')
    } else {
      logAction(`failed to upload ${fileNames}`, { variant: 'error' })
    }
  }

  const deleteCallback = async (isSuccess, fileName) => {
    if (isSuccess) {
      logAction(`deleted ${fileName}`)
    } else {
      logAction(`failed to delete ${fileName}`, { variant: 'error' })
    }
  }

  return (
    <SPList
      listName={listName}
      // dialogProps={dialogProps}
      uploadCallback={uploadCallback}
      allowUpload={currentUser.isOwner}
      allowDelete={currentUser.isOwner}
      deleteCallback={deleteCallback}
      columnFiltering={true}
    />
  )
}
