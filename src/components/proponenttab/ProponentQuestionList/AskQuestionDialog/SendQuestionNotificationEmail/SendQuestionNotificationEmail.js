import { GetListItems, GetCurrentUser, GetUserByEmail } from 'citz-imb-sp-utilities'
import { SendConfirmationEmail, GetCurrentProponent } from 'Components'

export const SendQuestionNotificationEmail = async () => {
	const emailText = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'NewQuestionEmail'`,
	})

	const contactEmail = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'contactemail'`,
	})

	const user = await GetUserByEmail({email: contactEmail[0].TextValue})

	const currentProponent = await GetCurrentProponent()
	const currentUser = await GetCurrentUser({})

	SendConfirmationEmail(
		user[0].LoginName,
		currentProponent.Title,
		emailText[0].TextValue,
		emailText[0].MultiTextValue,
		[{ searchvalue: /\[UserName\]/g, newvalue: currentUser.Title }]
	)
}
