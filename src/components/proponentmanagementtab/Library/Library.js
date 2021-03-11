import React from 'react'
import { SPLibrary } from 'components/SharePoint'

export const Library = (props) => {
	const { UUID } = props

	const libraryOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	// const { isLoading, getRender } = useList_OLD(UUID)

	return <SPLibrary  listName={UUID}/>
}
