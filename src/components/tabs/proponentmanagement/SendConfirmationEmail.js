import { GetListItems, GetSite, SendEmail } from 'citz-imb-sp-utilities'

export const SendConfirmationEmail = (users, rowdata) => {
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
		const bodyTemplate = emailResponse[0].MultiTextValue.replace(
			/\[Title\]/g,
			siteResponse.Title
		)
			.replace(
				/\[SiteLink\]/g,
				`<a href='${siteResponse.Url}'>${siteResponse.Title}</a>`
			)
			.replace(/\[ContactEmail\]/g, contactResponse[0].TextValue)
			.replace(/\[Proponent\]/g, rowdata.Title)

		const subjectTemplate = emailResponse[0].TextValue.replace(
			/\[Title\]/g,
			siteResponse.Title
		).replace(/\[Proponent\]/g, rowdata.Title)

		//per user change
		for (let i = 0; i < users.length; i++) {
			let subject = subjectTemplate.replace(
				/\[Username\]/g,
				users[i].Title
			)

			let body = bodyTemplate.replace(/\[Username\]/g, users[i].Title)

			SendEmail({
				to: users[i].Email,
				subject: subject,
				body: body,
				bcc: ['scott.toews@gov.bc.ca'],
			})
		}
	})
}
