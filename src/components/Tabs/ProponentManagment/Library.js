import { SPLibrary } from 'components/SharePoint'
import React from 'react'

export const Library = (props) => {
	const { UUID } = props

	return <SPLibrary  listName={UUID}/>
}
