import { RestCall } from '../RestCall/RestCall';
import { GetList } from '../GetList/GetList';

export const UpdateListItem = async ({ listName, listGUID, items }) => {
	let endPoint;

	if (!Array.isArray(items)) items = [items];

	if (listGUID) {
		endPoint = `/_api/web/Lists('${listGUID}')/items`;
	} else {
		endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;
	}

	const listResponse = await GetList({ listName, listGUID });

	items.forEach(async (item) => {
		let tempItem = {
			...item,
			__metadata: { type: listResponse.ListItemEntityTypeFullName },
		};
		await RestCall({
			endPoint: `${endPoint}(${tempItem.Id})`,
			method: 'merge',
			body: tempItem,
		});

	});

	//updating items in sharepoint does not return content
	return items;
};
