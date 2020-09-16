import { GetListItems, GetSite, SendEmail } from 'citz-imb-sp-utilities'

const replaceText = (props) => {
	const { text, values } = props
	let newText = text

	for (let i = 0; i < values.length; i++) {
		newText = newText.replace(values[i].searchvalue, values[i].newvalue)
	}

	return newText
}

export const SendAddUserConfirmationEmail = (users, rowdata) => {
	Promise.all([
		GetListItems({
			listName: 'Config',
			filter: `Key eq 'contactemail'`,
		}),
		GetListItems({
			listName: 'Config',
			filter: `Key eq 'addUserEmail'`,
		}),
		GetSite({}),
	]).then((response) => {
		const [contactResponse, emailResponse, siteResponse] = response

		//standard message changes (all users)
		const bodyTemplate = replaceText({
			text: emailResponse[0].MultiTextValue,
			values: [
				{ searchvalue: /\[Title\]/g, newvalue: siteResponse.Title },
				{
					searchvalue: /\[SiteLink\]/g,
					newvalue: `<a href='${siteResponse.Url}'>${siteResponse.Title}</a>`,
				},
				{
					searchvalue: /\[ContactEmail\]/g,
					newvalue: contactResponse[0].TextValue,
				},
				{ searchvalue: /\[Proponent\]/g, newvalue: rowdata.Title },
			],
		})

		const subjectTemplate = replaceText({
			text: emailResponse[0].TextValue,
			values: [
				{ searchvalue: /\[Title\]/g, newvalue: siteResponse.Title },
				{ searchvalue: /\[Proponent\]/g, newvalue: rowdata.Title },
			],
		})

		//per user change
		for (let i = 0; i < users.length; i++) {
			let subject = replaceText({
				text: subjectTemplate,
				values: [
					{ searchvalue: /\[Username\]/g, newvalue: users[i].Title },
				],
			})

			let body = replaceText({
				text: bodyTemplate,
				values: [
					{ searchvalue: /\[Username\]/g, newvalue: users[i].Title },
				],
			})

			SendEmail({
				to: users[i].Email,
				subject: subject,
				body: body,
				bcc: ['scott.toews@gov.bc.ca'],
			})
		}
	})
}
