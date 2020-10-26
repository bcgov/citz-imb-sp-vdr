import React from 'react'
import { SPDialog } from 'Components'
import { DialogContentText, TextField, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export const EditDialog = ({
	open,
	title,
	instructions,
	textValue,
	textValueLabel,
	numberValue,
	numberValueLabel,
	multiTextValue,
	multiTextValueLabel,
	onValueChange = (field, newValue) => {},
	saveAction = () => {},
	closeAction = () => {},
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
				{textValue ? (
					<Grid item>
						<TextField
							id='Edit_Dialog_TextValue'
							label={textValueLabel}
							defaultValue={textValue}
							fullWidth={true}
							variant={'outlined'}
							onChange={(event) => {
								onValueChange('TextValue', event.target.value)
							}}
						/>
					</Grid>
				) : null}
				{numberValue ? (
					<Grid item>
						<TextField
							id='Edit_Dialog_numberValue'
							label={numberValueLabel}
							defaultValue={numberValue}
							fullWidth={true}
							variant={'outlined'}
							onChange={(event) => {
								onValueChange('NumberValue', event.target.value)
							}}
						/>
					</Grid>
				) : null}
				{multiTextValue ? (
					<Grid item>
						<TextField
							id='Edit_Dialog_multiTextValue'
							label={multiTextValueLabel}
							defaultValue={multiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							variant={'outlined'}
							margin='normal'
							onChange={(event) => {
								onValueChange(
									'MultiTextValue',
									event.target.value
								)
							}}
						/>
					</Grid>
				) : null}
			</Grid>
		</SPDialog>
	)
}
