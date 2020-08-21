import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, Paper, DialogContent, DialogActions, Button } from '@material-ui/core'
import { PeoplePicker } from './PeoplePicker'

export const SPAddUser = ({ open, groupName, handleSave, handleCancel }) => {
	const [userInfo, setUserInfo] = useState([])
	const styles = {
		paper: {
			height: '300px',
			width: '500px'
		}
	}

	const saveUsers = () => {
		handleSave(userInfo)
	}

	const getUsers = users => {
		setUserInfo(users)
	}

	useEffect(() => {
		return () => { }
	}, [])

	return (
		<Dialog open={open} maxWidth='md' onClose={handleCancel}>
			<DialogTitle id='form-dialog-title'>Add user to {groupName}</DialogTitle>
			<DialogContent>
				<Paper style={styles.paper}>
					<PeoplePicker
						schema={{
							PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
							SearchPrincipalSource: 15,
							ResolvePrincipalSource: 15,
							AllowMultipleValues: true,
							MaximumEntitySuggestions: 50,
							Width: '400px'
						}}
						elementName={`${groupName}_addUserPeoplePicker`}
						getUserInfo={getUsers}
					/>
				</Paper>
			</DialogContent>
			<DialogActions>
				<Button onClick={saveUsers} color='primary'>
					Save
				</Button>
				<Button onClick={handleCancel} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
