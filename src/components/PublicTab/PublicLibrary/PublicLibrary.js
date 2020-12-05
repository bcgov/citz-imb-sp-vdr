import React from 'react'
import { SPList } from 'Components'

export const PublicLibrary = () => {
	const libraryOptions = {
		listName: 'Documents',
		columnFiltering: false,
		showTitle: false,
	}

	return <SPList {...libraryOptions} />
}
