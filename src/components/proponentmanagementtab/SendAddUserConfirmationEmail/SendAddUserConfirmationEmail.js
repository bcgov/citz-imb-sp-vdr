import { GetListItems } from 'citz-imb-sp-utilities'
import { SendConfirmationEmail } from 'Components'

export const SendAddUserConfirmationEmail = async (users, proponent) => {
	const response = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'addUserEmail'`,
	})

	users.map((user) => {
		SendConfirmationEmail(
			user.Email,
			proponent,
			response[0].TextValue,
			response[0].MultiTextValue,
			[{ searchvalue: /\[Username\]/g, newvalue: user.Title }]
		)
	})
}
