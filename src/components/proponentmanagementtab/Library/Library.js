import React from 'react'
import { SPLibrary } from 'components/SharePoint'

export const Library = (props) => {
	const { UUID } = props

	const libraryOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	return <SPLibrary  listName={UUID}/>
}
