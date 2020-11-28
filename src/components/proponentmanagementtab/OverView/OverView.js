import React, { Fragment, useState, useEffect } from 'react'
import {
	Container,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Switch,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormikDialog } from 'Components'
import { Proponent } from 'components/ProponentTab/ProponentTab'

export const OverView = (props) => {
	const {
		Active,
		Title,
		UUID,
		getProponent,
		setProponentActive,
		setProponentInactive,
	} = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [questionsAnswered, setQuestionsAnswered] = useState('-value tbd-')
	const [questionsAsked, setQuestionsAsked] = useState()
	const [questionsWithdrawn, setQuestionWithdrawn] = useState('-value tbd-')
	const [documentCount, setDocumentCount] = useState('-value tbd-')

	const handleToggle = (event) => {
		setDialogOptions({
			open: true,
			close: () => {
				setDialogOptions({ open: false })
			},
			title: `Set ${Title} to ${Active ? 'Inactive' : 'Active'}`,
			dialogContent: Active ? (
				<Alert severity={'error'}>
					<AlertTitle>Proponent Group will be deleted</AlertTitle>
					Member users will no-longer be able to access the site.
				</Alert>
			) : (
				<Alert severity={'info'}>
					<AlertTitle>
						A new group will be created for the proponent
					</AlertTitle>
					You will need to manually add users.
				</Alert>
			),
			onSubmit: async (values, { setSubmitting }) => {
				if (Active) {
					await setProponentInactive(UUID)
				} else {
					await setProponentActive(UUID)
				}
				setSubmitting(false)
				setDialogOptions({ open: false })
			},
		})
	}

	useEffect(() => {
		if (UUID) {
			const _proponent = getProponent(UUID)
			setQuestionsAsked(_proponent.questionCount.asked)
			// setQuestionsAnswered(_proponent.questionCount.answered)
			// setQuestionWithdrawn(_proponent.questionCount.withdrawn)
		}
		return () => {}
	}, [UUID])

	return (
		<Fragment>
			<Container fixed>
				<List>
					<ListItem>
						<ListItemText id='overview-list-label-uuid'>
							Unique Id
						</ListItemText>
						<ListItemSecondaryAction>
							{UUID}
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText id='overview-list-label-active'>
							{Active ? 'Active' : 'Inactive'}
						</ListItemText>
						<ListItemSecondaryAction>
							<Switch
								edge='end'
								onChange={handleToggle}
								checked={Active}
								inputProps={{
									'aria-labelledby':
										'overview-list-label-active',
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText id='overview-list-label-uuid'>
							Questions Asked
						</ListItemText>
						<ListItemSecondaryAction>
							{questionsAsked}
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText id='overview-list-label-uuid'>
							Questions Answered
						</ListItemText>
						<ListItemSecondaryAction>
							{questionsAnswered}
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText id='overview-list-label-uuid'>
							Questions Withdrawn
						</ListItemText>
						<ListItemSecondaryAction>
							{questionsWithdrawn}
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemText id='overview-list-label-uuid'>
							Documents Submitted
						</ListItemText>
						<ListItemSecondaryAction>
							{documentCount}
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Container>
			<FormikDialog {...dialogOptions} />
		</Fragment>
	)
}
