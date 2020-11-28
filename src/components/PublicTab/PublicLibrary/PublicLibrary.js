import React from 'react'
import { ListTable } from 'Components'

export const PublicLibrary = () => {
	const libraryOptions = {
		listName: 'Documents',
		columnFiltering: false,
		showTitle: false,
	}

	return <ListTable {...libraryOptions} />
}
