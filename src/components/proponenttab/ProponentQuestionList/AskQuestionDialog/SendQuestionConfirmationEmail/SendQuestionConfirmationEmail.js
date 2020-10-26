import {GetListItems, GetCurrentUser} from 'citz-imb-sp-utilities'
import {SendConfirmationEmail} from 'Components'

export const SendQuestionConfirmationEmail = async (users, proponentName) => {
    const response = await GetListItems({
        listName: 'Config',
        filter: `Key eq 'addQuestionEmail'`,
    })

    const currentUser = await GetCurrentUser({})

    users.map((user) => {
		SendConfirmationEmail(
			user.LoginName,
			proponentName,
			response[0].TextValue,
			response[0].MultiTextValue,
            [
                { searchvalue: /\[AddresseeName\]/g, newvalue: user.Title },
                { searchvalue: /\[UserName\]/g, newvalue: currentUser.Title }
        ]
		)
	})

}