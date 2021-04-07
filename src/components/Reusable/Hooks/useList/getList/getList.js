import { GetList, GetListItems } from 'components/ApiCalls';

export const getList = async (listName, options) => {
	let list = await GetList({
		listName,
		expand:
			'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
	});
	let items = await GetListItems({ listName, ...options });
	list.CurrentView = list.DefaultView;

	return {
		list,
		items,
	};
};
