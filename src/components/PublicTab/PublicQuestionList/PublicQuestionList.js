import React from 'react'
import { SPList } from 'Components'

export const PublicQuestionList = () => {
	const listOptions = {
		listName: 'Questions',
		columnFiltering: false,
		showTitle: false,
	}

	return <SPList {...listOptions} />
}
