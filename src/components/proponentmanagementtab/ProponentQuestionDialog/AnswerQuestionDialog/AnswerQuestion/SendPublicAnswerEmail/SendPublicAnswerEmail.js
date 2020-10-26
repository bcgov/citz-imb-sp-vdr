import { GetListItems } from 'citz-imb-sp-utilities'
import {GetAllProponentUsers, SendConfirmationEmail} from 'Components'

export const SendPublicAnswerEmail = async (proponentName) => {
    const emailConfig = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'newAnswerEmail'`,
    })

    const users = await GetAllProponentUsers()

	users.map((user) => {
		SendConfirmationEmail(
			user.LoginName,
			proponentName,
			emailConfig[0].TextValue,
			emailConfig[0].MultiTextValue,
			[{ searchvalue: /\[AddresseeName\]/g, newvalue: user.Title }]
		)
	})
}
