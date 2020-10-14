import { GetListItems } from 'citz-imb-sp-utilities'
import { SendConfirmationEmail } from 'Components'

export const SendAddUserConfirmationEmail = async (users, proponentName) => {
	const response = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'addUserEmail'`,
	})

	console.log('SendAddUserConfirmationEmail :>> ', {users: users, proponent: proponentName, response});

	users.map((user) => {
		console.log('SendAddUserConfirmationEmail user :>> ', {user});
		SendConfirmationEmail(
			user.LoginName,
			proponentName,
			response[0].TextValue,
			response[0].MultiTextValue,
			[{ searchvalue: /\[AddresseeName\]/g, newvalue: user.Title }]
		)
	})
}
