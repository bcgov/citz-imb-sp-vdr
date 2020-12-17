import React, { Fragment, useEffect, useState } from 'react'
import { FormikDialog, useList } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Assignee } from './Assignee/Assignee'

/*

1. Proponent Submits Question => VICO Manager :: Received
2. VICO Manager assigns work => Business SME || Procurement Branch || Legal :: Under Review
3. VICO Manager Posts Answer => null :: Posted

Proponent may withdraw question prior to step 3 => null :: Withdrawn

*/

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })

	const onSubmit = async (values, { setSubmitting }) => {}

	const listOptions = {
		columnFiltering: false,
		showTitle: false,
		customColumns: [
			{
				accessor: 'Answer',
				Cell: ({ value, row }) => {
					return value ? 'true' : row.original.AnswerStatus
				},
			},
			{
				accessor: 'Assignee',
				Cell: ({ value, row }) => {
					return (
						<Assignee
							assignedTo={value}
							status={row.original.AnswerStatus}
							questionId={row.original.QuestionID}
							id={row.original.Id}
							updateItem={updateItem}
						/>
					)
				},
			},
		],
	}

	const { changeView, isLoading, getRender, updateItem } = useList(
		`${UUID}_Questions`
	)

	const { items: AnswerItems } = useList('Questions')

	useEffect(() => {
		if (!isLoading) changeView('VICO_Manager')
		return () => {}
	}, [isLoading])

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : getRender(listOptions)}
			<FormikDialog {...dialogOptions} />
		</Fragment>
	)
}
