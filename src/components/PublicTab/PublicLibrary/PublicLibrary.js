import { useConfig, useCurrentUser, useProponents } from 'components'
import { SPLibrary } from 'components/SharePoint'
import React, { useMemo } from 'react'

export const PublicLibrary = () => {
	const publicLibrary = 'Documents'

	const dialogProps = useMemo(() => {
		return { title: `Upload to ${publicLibrary}` }
	}, [])

	const proponents = useProponents()
	const config = useConfig()
	const currentUser = useCurrentUser()

	const publicDocumentEmail = config.data.filter(
		(item) => item.Key === 'publicDocumentEmail'
	)[0]

	const uploadCallback = async () => {
		await proponents.sendEmailToProponents({
			subject: publicDocumentEmail.TextValue,
			body: publicDocumentEmail.MultiTextValue,
		})
	}

	return (
		<SPLibrary
			listName={publicLibrary}
			dialogProps={dialogProps}
			uploadCallback={uploadCallback}
			allowUpload={currentUser.isOwner}
			allowDelete={currentUser.isOwner}
		/>
	)
}
