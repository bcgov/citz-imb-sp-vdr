import { RestCall } from '../RestCall/RestCall';

export const RemoveItemsFromList = async ({ listName, listGUID, itemIds }) => {
	let endPoint;

	if (!Array.isArray(itemIds)) itemIds = [itemIds];

	if (listGUID) {
		endPoint = `/_api/web/Lists('${listGUID}')/items`;
	} else {
		endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;
	}

	const responses = [];
	itemIds.forEach(async (itemId) => {
		const response = await RestCall({
			endPoint: `${endPoint}(${itemId})/recycle`,
			method: 'post',
			headers: {
				'x-http-method': 'delete',
				'if-match': '*',
			},
		});

		responses.push(response);
	});

	return responses.map((response) => response.d);
};
