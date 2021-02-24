import React from 'react'
import { SPList } from 'components/SharePoint'

export const PublicQuestionList = () => {
	const listOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const publicQuestionsList = 'Questions'

	return <SPList listName={publicQuestionsList} />
}
