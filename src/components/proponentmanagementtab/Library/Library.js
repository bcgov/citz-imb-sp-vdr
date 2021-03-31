import React from 'react'
import { SPLibrary } from 'components/SharePoint'

export const Library = (props) => {
	const { UUID } = props

	return <SPLibrary  listName={UUID}/>
}
