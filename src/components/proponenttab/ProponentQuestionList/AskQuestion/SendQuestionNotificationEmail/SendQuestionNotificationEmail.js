import { GetListItems, GetCurrentUser } from 'citz-imb-sp-utilities'
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

	const currentProponent = await GetCurrentProponent()
	const currentUser = await GetCurrentUser({})

	SendConfirmationEmail(
		contactEmail[0].TextValue,
		currentProponent.Title,
		emailText[0].TextValue,
		emailText[0].MultiTextValue,
		[{ searchvalue: /\[UserName\]/g, newvalue: currentUser.Title }]
	)
}
