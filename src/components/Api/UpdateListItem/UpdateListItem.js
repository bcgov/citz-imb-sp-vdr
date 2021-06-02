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
console.log('listName :>> ', listName);
	const listResponse = await GetList({ listName, listGUID });

	let responses = [];

	items.forEach(async (item) => {
		let tempItem = {
			...item,
			__metadata: { type: listResponse.ListItemEntityTypeFullName },
		};
		const response = await RestCall({
			endPoint: `${endPoint}(${tempItem.Id})`,
			method: 'merge',
			body: tempItem,
		});

		responses.push(response);
	});

	return responses;
};
