import { GetListItems } from 'citz-imb-sp-utilities'

import { configListName, configTOSFilter } from 'Components'

export const GetTermsOfService = async () => {
	let terms
	try {
		terms = await GetListItems({
			listName: configListName,
			filter: configTOSFilter,
		})
	} catch (error) {
		console.error('error in GetTermsOfService', error)
	}

	return terms
}
