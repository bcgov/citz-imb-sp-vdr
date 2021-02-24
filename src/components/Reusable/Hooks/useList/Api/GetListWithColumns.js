import { GetList } from 'citz-imb-sp-utilities'
import { GetColumns } from './GetColumns'

export const GetListWithColumns = async ({ listName, options }) => {
	let response = await GetList({
		listName: listName,
		expand:
			'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
	})

	response.CurrentView = response.DefaultView

	response = GetColumns(response)

	return response
}
