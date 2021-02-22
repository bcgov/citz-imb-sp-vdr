import React from 'react'
import { SPLibrary } from 'components/SharePoint'

export const PublicLibrary = () => {
	const publicLibrary = 'Documents'

	return <SPLibrary listName={publicLibrary} />
}
