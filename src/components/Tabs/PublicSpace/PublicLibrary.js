import { useConfig, useCurrentUser, useProponents } from 'components'
import { useLogAction } from 'components/Reusable'
import { SPLibrary } from 'components/SharePoint'
import React, { useMemo } from 'react'

export const PublicLibrary = () => {
  const listName = 'Documents'

  const dialogProps = useMemo(() => {
    return { title: `Upload to ${listName}` }
  }, [])
  const logAction = useLogAction()
  // const proponents = useProponents()
  const config = useConfig()
  const currentUser = useCurrentUser()

  const publicDocumentEmail = config.items.filter(
    (item) => item.Key === 'publicDocumentEmail'
  )[0]

  // const uploadCallback = async (result, fileNames) => {
  //   if (result === 'success') {
  //     await proponents.sendEmailToProponents({
  //       subject: publicDocumentEmail.TextValue,
  //       body: publicDocumentEmail.MultiTextValue,
  //     })
  //     logAction(`uploaded ${fileNames}`)
  //   } else {
  //     logAction(`failed to upload ${fileNames}`, { variant: 'error' })
  //   }
  // }

  // const deleteCallback = async (result, fileName) => {
  //   if (result === 'success') {
  //     logAction(`deleted ${fileName}`)
  //   } else {
  //     logAction(`failed to delete ${fileName}`, { variant: 'error' })
  //   }
  // }

  const libraryProps = {
    listName,
    dialogProps,
    columnFiltering: true,
  }

  // if (currentUser.isOwner) {
  //   libraryProps.uploadCallback = uploadCallback
  //   libraryProps.allowUpload = true
  //   libraryProps.allowDelete = true
  //   libraryProps.deleteCallback = deleteCallback
  // }
return <h1>hello there</h1>
  // return <SPLibrary {...libraryProps} />
}
