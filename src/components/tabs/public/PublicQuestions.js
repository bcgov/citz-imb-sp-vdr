import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { GetListItems } from 'citz-imb-sp-utilities'

export const PublicQuestions = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		GetListItems({ listName: 'Questions' }).then(response => {
			setData(response)
		})
		return () => {}
	}, [])

	return (
		<MaterialTable
			options={{
				search: false,
				paging: false,
				sorting: false,
				draggable: false
			}}
			columns={[
				{ title: 'Question', field: 'Question' },
				{ title: 'Answer', field: 'Answer' }
			]}
			data={data}
			title='Published Questions and Answers'
		/>
	)
}
