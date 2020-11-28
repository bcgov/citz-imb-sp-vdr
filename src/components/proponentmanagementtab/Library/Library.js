import React from 'react'
import { ListTable } from 'Components'

export const Library = (props) => {
	const { UUID } = props

	const libraryOptions = {
		listName: UUID,
		columnFiltering: false,
		showTitle: false,
	}

	return <ListTable {...libraryOptions} />
}
