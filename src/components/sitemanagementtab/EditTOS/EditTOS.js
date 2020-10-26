import React from 'react'
import { SPDialog } from 'Components'
import { DialogContentText, TextField, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export const EditTOS = ({
	open,
	title,
	instructions,
	textValue,
	numberValue,
	multiTextValue,
    onValueChange = (field, newValue) => {},
    saveAction = ()=>{},
    closeAction = ()=>{}
}) => {
	return (
		<SPDialog
			open={open}
			title={title}
			saveButtonAction={saveAction}
			cancelButtonAction={closeAction}
			fullScreen={true}>
			<Grid container direction={'column'} spacing={1}>
				<Grid item>
					<DialogContentText component='div'>
						<Alert severity={'info'}>
							<AlertTitle>Instructions</AlertTitle>
							<div
								dangerouslySetInnerHTML={{
									__html: instructions,
								}}
							/>
						</Alert>
					</DialogContentText>
				</Grid>
				<Grid item>
					<TextField
						id='TOS_Title'
						label={'title'}
						defaultValue={textValue}
						fullWidth={true}
						variant={'outlined'}
						onChange={(event) => {
							onValueChange('TextValue', event.target.value)
						}}
					/>
				</Grid>
				<Grid item>
					<TextField
						id='TOS_Days'
						label='Days until TOS Prompt'
						defaultValue={numberValue}
						fullWidth={true}
						variant={'outlined'}
						onChange={(event) => {
							onValueChange('NumberValue', event.target.value)
						}}
					/>
				</Grid>
				<Grid item>
					<TextField
						variant='outlined'
						id='TOS_body'
						label='Body'
						defaultValue={multiTextValue}
						multiline={true}
						rows={6}
						fullWidth={true}
						variant={'outlined'}
						margin='normal'
						onChange={(event) => {
							onValueChange('MultiTextValue', event.target.value)
						}}
					/>
				</Grid>
			</Grid>
		</SPDialog>
	)
}
