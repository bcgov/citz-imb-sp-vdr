import React, { useContext } from 'react'
import { ListTable, UserContext } from 'Components'

export const ProponentLibrary = ({ proponent }) => {
	const currentUser = useContext(UserContext)

	const libraryOptions = {
		listName: currentUser.proponent,
		columnFiltering: false,
		showTitle: false,
	}

	return <ListTable {...libraryOptions} />
}
