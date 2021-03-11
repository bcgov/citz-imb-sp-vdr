import React from 'react'
import { SPLibrary } from 'components/SharePoint'
import { useProponents, useConfig } from 'components'

export const PublicLibrary = () => {
	const publicLibrary = 'Documents'

	const dialogProps = { title: `Upload to ${publicLibrary}` }

	const proponents = useProponents()
	const config = useConfig()


	const publicDocumentEmail = config.items.filter(
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
			allowUpload={true}
		/>
	)
}
