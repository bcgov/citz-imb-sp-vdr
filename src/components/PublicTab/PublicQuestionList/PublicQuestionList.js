import React from 'react'
import { ListTable } from 'Components'

export const PublicQuestionList = () => {
	const listOptions = {
		listName: 'Questions',
		columnFiltering: false,
		showTitle: false,
	}

	return <ListTable {...listOptions} />
}
