import {
	GetList,
	GetListItems,
	AddItemsToList,
	UpdateListItem,
} from 'citz-imb-sp-utilities'

export const getList = async (listName) => {
	let response = await GetList({
		listName: listName,
		expand:
			'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
	})

	console.log('response :>> ', response);
	response.CurrentView = response.DefaultView

	return response
}
