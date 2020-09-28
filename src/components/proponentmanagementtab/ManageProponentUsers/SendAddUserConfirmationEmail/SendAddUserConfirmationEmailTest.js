import React from 'react'
import Button from '@material-ui/core/Button'
import { SendAddUserConfirmationEmail } from './SendAddUserConfirmationEmail'

export const SendAddUserConfirmationEmailTest = () => {
	const rowdata = {
		Active: true,
		Attachments: false,
		AuthorId: 6,
		ContentTypeId: '0x010018263DB17EF71245A6CAB2C9ABA9F3B0',
		Created: '2020-09-15T15:30:26Z',
		EditorId: 6,
		FileSystemObjectType: 0,
		GUID: '72bd5188-4ff5-41e2-8fb5-533965550443',
		GroupId: 2131,
		ID: 122,
		Id: 122,
		Modified: '2020-09-15T15:30:26Z',
		OData__UIVersionString: '1.0',
		Title: 'Proponent A',
		UUID: 'VED563F',
		tableData: { id: 0 },
	}

	const users = [
		{
			Email: 'Scott.Toews@gov.bc.ca',
			Id: 6,
			IsHiddenInUI: false,
			IsShareByEmailGuestUser: false,
			IsSiteAdmin: true,
			LoginName: 'i:0ǵ.t|bcgovidp|a32d6f859c66450ca4995b0b2bf0a844',
			PrincipalType: 1,
			Title: 'Toews, Scott D CITZ:EX',
		},
	]

	const handleClick = () => {
		SendAddUserConfirmationEmail(users, rowdata)
	}

	return (
		<Button variant='contained' color='primary' onClick={handleClick}>
			Send Email
		</Button>
	)
}
