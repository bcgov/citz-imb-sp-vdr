import { useConfig, useCurrentUser, useProponents } from 'components'
import { useLogAction } from 'components/Reusable'
import { SPLibrary } from 'components/SharePoint'
import React, { useMemo } from 'react'

export const PublicLibrary = () => {
  const publicLibrary = 'Documents'

  const dialogProps = useMemo(() => {
    return { title: `Upload to ${publicLibrary}` }
  }, [])
  const logAction = useLogAction()
  const proponents = useProponents()
  const config = useConfig()
  const currentUser = useCurrentUser()

  const publicDocumentEmail = config.items.filter(
    (item) => item.Key === 'publicDocumentEmail'
  )[0]

  const uploadCallback = async (result, fileNames) => {
    if (result === 'success') {
      await proponents.sendEmailToProponents({
        subject: publicDocumentEmail.TextValue,
        body: publicDocumentEmail.MultiTextValue,
      })
      logAction(`uploaded ${fileNames}`)
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
    <SPLibrary
      listName={publicLibrary}
      dialogProps={dialogProps}
      uploadCallback={uploadCallback}
      allowUpload={currentUser.isOwner}
      allowDelete={currentUser.isOwner}
      deleteCallback={deleteCallback}
    />
  )
}
