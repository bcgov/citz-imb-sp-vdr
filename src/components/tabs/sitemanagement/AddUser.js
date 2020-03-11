import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, Paper, DialogContent, DialogActions, Button } from '@material-ui/core'
import PeoplePicker from '../../sharepoint/PeoplePicker'

export default function AddUser({ open, proponentName, getUserInfo, handleClose }) {
  const [userInfo, setUserInfo] = useState([])
		const styles = {
		paper: {
			height: '300px',
			width: '500px'
		}
	}

	const handleSave = () => {
    getUserInfo(userInfo)
		handleClose()
	}

  const getUsers = users => {
		setUserInfo(users)
  }

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<Dialog open={open} maxWidth='md' onClose={handleClose}>
			<DialogTitle id='form-dialog-title'>Add user to {proponentName}</DialogTitle>
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
						elementName={'myPeoplePicker'}
						getUserInfo={getUsers}
					/>
				</Paper>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave} color='primary'>
					Save
				</Button>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
