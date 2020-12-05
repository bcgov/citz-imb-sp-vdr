import React, { useContext } from 'react'
import { SPList, UserContext } from 'Components'

export const ProponentLibrary = ({ proponent }) => {
	const currentUser = useContext(UserContext)

	const libraryOptions = {
		listName: currentUser.proponent,
		// columnFiltering: false,
		//showTitle: false,
	}

	return currentUser.proponent === 'not a proponent' ? null :<SPList {...libraryOptions} />
}
