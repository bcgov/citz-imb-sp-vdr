import { RestCall } from '../RestCall/RestCall';
import { GetList } from '../GetList/GetList';

export const AddItemsToList = async ({ listName, items }) => {
	let endPoint;

	if (!Array.isArray(items)) items = [items];

	const list = await GetList({ listName });

	endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;

	let responses = [];

	for (let i = 0; i < items.length; i++) {
		items[i].__metadata = {
			type: list.ListItemEntityTypeFullName,
		};
		const response = await RestCall({
			endPoint: endPoint,
			method: 'post',
			body: items[i],
		});
		responses.push(response.d);
	}

	return responses;
};
