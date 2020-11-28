import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { FormikDialog, useList, useLogAction } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'

export const AskQuestionDialog = ({
	open,
	closeDialog,
	listName,
	proponentName,
	groupId,
}) => {
	const [question, setQuestion] = useState('')
	const [showAlert, setShowAlert] = useState(false)
	const {
		title,
		columns,
		items,
		fields,
		views,
		refresh,
		changeView,
		addItem,
		addColumns,
	} = useList(listName)

	const logAction = useLogAction()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const onSubmit = (values, { setSubmitting }) => {
		addItem(values).then((response) => {
			setSubmitting(false)
			console.log('values :>> ', values)
			logAction(`asked ${values.Title}`)
			closeDialog()
		}).catch(error=>{
			console.log('error :>> ', error);
		})
	}

	const cancelAction = () => {
		closeDialog()
	}

	return (
		<FormikDialog
			fields={[
				{
					name: 'Title',
					label: 'Question',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					required: true,
					control: 'input',
				},
			]}
			onSubmit={onSubmit}
			open={open}
			close={closeDialog}
			title={'Ask Question'}
			instructions={''}
		/>
	)
}
