import { useMemo } from 'react'
import { useCurrentUser, useEmail, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'

export const PublicLibrary = () => {
  const listName = 'Documents'

  const logAction = useLogAction()
  const currentUser = useCurrentUser()
  const { sendEmailToAllProponents } = useEmail()

  const uploadCallback = async (result, fileNames = []) => {
    if (result === 'success') {
      fileNames.map(fileName => {
        logAction(`uploaded ${fileName}`, {
          snackbar: false,
        })
      })
      logAction(`uploaded ${fileNames.length} files`, {
        snackbarOnly: true,
      })

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

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'Modified', desc: true }] }
  }, [])

  return (
    <SPList
      listName={listName}
      // dialogProps={dialogProps}
      uploadCallback={uploadCallback}
      allowUpload={currentUser.isOwner}
      allowDelete={currentUser.isOwner}
      deleteCallback={deleteCallback}
      columnFiltering={true}
      noRecordsText={'No documents have been made public yet'}
      initialState={initialState}
      downloadSelected={true}
    />
  )
}
