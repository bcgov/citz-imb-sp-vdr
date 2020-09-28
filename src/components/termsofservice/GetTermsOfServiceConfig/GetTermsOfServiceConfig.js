import { GetListItems } from 'citz-imb-sp-utilities'

import { configListName, configTOSFilter } from 'Components'

export const GetTOSConfig = async () => {
	const response = await GetListItems({
		listName: configListName,
		filter: configTOSFilter,
	})
	return response
}
