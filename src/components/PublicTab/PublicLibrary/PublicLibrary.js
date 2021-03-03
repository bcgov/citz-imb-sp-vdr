import React from 'react'
import { SPLibrary } from 'components/SharePoint'

export const PublicLibrary = () => {
	const publicLibrary = 'Documents'

	const dialogProps = { title: `Upload to ${publicLibrary}` }

	return <SPLibrary listName={publicLibrary} dialogProps={dialogProps} />
}
