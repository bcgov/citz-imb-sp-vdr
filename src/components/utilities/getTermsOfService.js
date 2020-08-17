import { GetListItems } from 'citz-imb-sp-utilities'

import { configListName } from 'Components'

const getListItems = async () => {
	const response = await GetListItems({
		listName: configListName,
		filter: `Key eq 'TOS'`,
	})

	return response
}

export const getTermsOfService = async () => {
	if (getTermsOfService._instance) {
		return getTermsOfService._instance
	}

	try {
		const response = await getListItems()
		getTermsOfService._instance = {
			title: response[0].TextValue,
			body: response[0].MultiTextValue,
		}
		return getTermsOfService._instance
	} catch (err) {
		console.log('err :>> ', err)
	}
}
