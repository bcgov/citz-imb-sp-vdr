import React, { useContext } from 'react'
import { PublicQuestionsContext } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const PublicQuestionList = () => {
	const listOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useContext(PublicQuestionsContext)

	return isLoading ? <LinearProgress /> : getRender(listOptions)
}
