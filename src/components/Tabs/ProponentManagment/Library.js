import { useCurrentUser, useEmail, useLogAction } from 'components/Hooks'
import { SPList } from 'components/SharePoint'
import { useMemo, useCallback } from 'react'

export const Library = (props) => {
  const { UUID } = props

  const currentUser = useCurrentUser()
  const logAction = useLogAction()
  const { sendEmailToCurrentProponentMembers } = useEmail()

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'Modified', desc: true }] }
  }, [])

  const uploadCallback = useCallback(
    async (result, fileNames) => {
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
        } catch (error) {
          console.error(error)
          logAction(`failed to send email notifications`, { variant: 'error' })
        }
      } else {
        logAction(`failed to upload ${fileNames}`, { variant: 'error' })
      }
    },
    [],
  )

  return <SPList
    listName={UUID}
    columnFiltering={true}
    initialState={initialState}
    downloadSelected={true}
    allowUpload={true}
    uploadCallback={uploadCallback}
    showNotificationSwitch={false}
  />
}
