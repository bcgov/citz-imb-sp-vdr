import React, { Fragment, useEffect, useState } from 'react'
import { useList } from 'Components'
import {
	Button,
	ButtonGroup,
	LinearProgress,
	Box,
	Typography,
	Card,
	CardContent,
	Grid,
} from '@material-ui/core'
import { FormikDialog } from 'components/Reusable/Reusable'
import * as Yup from 'yup'

/*

1. Proponent Submits Question => VICO Manager :: Not Started
2. VICO Manager assigns work => Business SME || Procurement Branch || Legal :: Under Review
3. Work is completed => VICO Manager :: Finalizing Answer
4. VICO Manager Posts Answer => null :: Posted

Proponent may withdraw question prior to step 4 => null :: Withdrawn

*/

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false })

	const assigneeCell = ({ value, row }) => {
		switch (row.original.AnswerStatus) {
			case 'Not Started':
				return (
					<Box>
						<Typography gutterBottom={true} color={'primary'}>
							{value}
						</Typography>
						<Box>
							<Typography variant={'caption'}>
								Assign To (Under Review):
							</Typography>
							<ButtonGroup
								orientation={'vertical'}
								variant={'outlined'}
								size={'small'}
								color={'secondary'}>
								Assign To:
								<Button
									onClick={() => {
										assignTo(
											'Business SME',
											'Under Review',
											row
										)
									}}>
									Business SME
								</Button>
								<Button
									onClick={() => {
										assignTo(
											'Procurement Branch',
											'Under Review',
											row
										)
									}}>
									Procurement Branch
								</Button>
								<Button
									onClick={() => {
										assignTo('Legal', 'Under Review', row)
									}}>
									Legal
								</Button>
							</ButtonGroup>
						</Box>
					</Box>
				)
			case 'Under Review':
				return (
					<Box>
						<Typography gutterBottom={true} color={'primary'}>
							{value}
						</Typography>
						<Box>
							<Typography variant={'caption'}>
								Assign To (Finalizing Answer):
							</Typography>

							<ButtonGroup
								orientation={'vertical'}
								variant={'outlined'}
								size={'small'}
								color={'secondary'}>
								<Button
									onClick={() => {
										assignTo(
											'VICO Manager',
											'Finalizing Answer',
											row
										)
									}}>
									VICO Manager
								</Button>
							</ButtonGroup>
							<Typography variant={'caption'} display={'block'}>
								Assign To (Under Review):
							</Typography>
							<ButtonGroup
								orientation={'vertical'}
								variant={'outlined'}
								size={'small'}
								color={'secondary'}>
								{value === 'Business SME' ? null : (
									<Button
										onClick={() => {
											assignTo(
												'Business SME',
												'Under Review',
												row
											)
										}}>
										Business SME
									</Button>
								)}

								{value === 'Procurement Branch' ? null : (
									<Button
										onClick={() => {
											assignTo(
												'Procurement Branch',
												'Under Review',
												row
											)
										}}>
										Procurement Branch
									</Button>
								)}

								{value === 'Legal' ? null : (
									<Button
										onClick={() => {
											assignTo(
												'Legal',
												'Under Review',
												row
											)
										}}>
										Legal
									</Button>
								)}
							</ButtonGroup>
						</Box>
					</Box>
				)
			case 'Finalizing Answer':
				return (
					<Box>
						<Typography gutterBottom={true} color={'primary'}>
							{value}
						</Typography>
						<Box>
							<Typography variant={'caption'}>
								Answer (Posted):
							</Typography>

							<ButtonGroup
								orientation={'vertical'}
								variant={'outlined'}
								size={'small'}
								color={'secondary'}>
								<Button
									onClick={() => {
										assignTo(null, 'Posted', row)
									}}>
									Post Answer
								</Button>
							</ButtonGroup>
						</Box>
					</Box>
				)
			case 'Posted':
				return <Box>{value}</Box>
			default:
				return value
		}
	}

	const onSubmit = async (values, { setSubmitting }) => {}

	const assignTo = async (Assignee, AnswerStatus, row) => {
		if (Assignee) {
			await updateItem({
				Id: row.original.Id,
				Assignee,
				AnswerStatus,
			})
		} else {
			console.log('{Assignee, AnswerStatus} :>> ', {
				Assignee,
				AnswerStatus,
				row,
				AnswerItems,
			})
			setDialogOptions({
				open: true,
				close: () => {
					setDialogOptions({ open: false })
				},
				fields: [
					{
						name: 'Related',
						label: 'Related Question & Answer',
						initialValue: '',
						validationSchema: Yup.string().required('Required'),
						required: true,
						control: 'input',
					},
					{
						name: 'Question',
						label: 'Sanitized Question',
						initialValue: '',
						validationSchema: Yup.string().required('Required'),
						required: true,
						control: 'input',
					},
					{
						name: 'Answer',
						label: 'Answer',
						initialValue: '',
						validationSchema: Yup.string().required('Required'),
						required: true,
						control: 'input',
					},
				],
				onSubmit,
				title: 'Answer the Question',
				instructions: 'instructions',
				dialogContent: (
					<Grid item>
						<Card variant={'outlined'}>
							<CardContent>
								<Typography align={'left'} variant={'body2'}>
									{row.values.Title}
								</Typography>
							</CardContent>
						</Card>

					</Grid>
				),
			})
		}
	}

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
				Cell: assigneeCell,
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
