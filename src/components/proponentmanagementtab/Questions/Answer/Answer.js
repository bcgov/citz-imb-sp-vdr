import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@material-ui/core'
import { GetListItems } from 'citz-imb-sp-utilities'

export const Answer = (props) => {
	const { questionId } = props

	const [isLoading, setisLoading] = useState(true)
	const [answer, setAnswer] = useState()

	const getAnswer = async () => {
		const _answer = await GetListItems({
			listName: 'Questions',
			filter: `Id eq ${questionId}`,
		})
        setAnswer(_answer[0].Answer)
	}

	useEffect(() => {
		getAnswer()
		return () => {}
	}, [])

	useEffect(() => {
		if (answer) setisLoading(false)
		return () => {}
	}, [answer])

	return isLoading ? <LinearProgress /> : answer
}
