import { GetList, GetListItems } from 'citz-imb-sp-utilities';

export const getList = async (listName) => {
	// console.log('getList', listName)
	let list = await GetList({
		listName: listName,
		expand:
			'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
	});
	// console.log('list :>> ', list)
	let items = await GetListItems(listName);
	// console.log('items :>> ', items)
	list.CurrentView = list.DefaultView;

	return {
		list,
		items,
	};
};
