import { GetListItems } from 'citz-imb-sp-utilities'

import { configListName, configTOSFilter } from 'Components'

export const GetTOSConfig = () => {
	return GetListItems({
		listName: configListName,
		filter: configTOSFilter,
	})
}
