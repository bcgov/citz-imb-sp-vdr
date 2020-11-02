import { GetListItems, GetSite, SendEmail } from 'citz-imb-sp-utilities'
import { useLogAction } from 'Components'

const replaceText = (props) => {
	const { text, values } = props
	let newText = text

	for (let i = 0; i < values.length; i++) {
		newText = newText.replace(values[i].searchvalue, values[i].newvalue)
	}

	return newText
}

export const SendConfirmationEmail = async (
	addresses,
	proponent,
	subject,
	body,
	additionalReplacementPairs = []
) => {
	const contactEmailConfig = await GetListItems({
		listName: 'Config',
		filter: `Key eq 'contactemail'`,
	})

	const site = await GetSite({})

	let normalReplacementPairs = [
		{ searchvalue: /\n/g, newvalue: '<br>' },
		{ searchvalue: /\[Title\]/g, newvalue: site.Title },
		{
			searchvalue: /\[SiteLink\]/g,
			newvalue: `<a href='${site.Url}'>${site.Title}</a>`,
		},
		{
			searchvalue: /\[ContactEmail\]/g,
			newvalue: contactEmailConfig[0].TextValue,
		},
		{ searchvalue: /\[Proponent\]/g, newvalue: proponent },
	]

	let replacementPairs = normalReplacementPairs.concat(
		additionalReplacementPairs
	)

	const newBody = replaceText({
		text: body,
		values: replacementPairs,
	})

	const newSubject = replaceText({
		text: subject,
		values: replacementPairs,
	})

	try {
		const emailResponse = await SendEmail({
			to: addresses,
			subject: newSubject,
			body: newBody,
			bcc: ['scott.toews@gov.bc.ca'],
		})
		useLogAction(`SendEmail succeeded: ${addresses}`)
	} catch (err) {
		console.error('err :>> ', err)
		useLogAction(`SendEmail failed: ${err.message}; addresses: ${addresses}`)
	}
}
