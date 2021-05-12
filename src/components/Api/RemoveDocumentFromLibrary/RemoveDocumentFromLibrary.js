import { GetListItems } from '../GetListItems/GetListItems';
import { RestCall } from '../RestCall/RestCall';

export const RemoveDocumentFromLibrary = async ({ listName, itemIds }) => {
	if (!Array.isArray(itemIds)) itemIds = [itemIds];

	itemIds.forEach(async (itemId) => {
		const itemResponse = await GetListItems({
			listName,
			itemId,
			expand: 'File',
		});
		const endPoint = `/_api/web/GetFileByServerRelativeUrl('${itemResponse.File.ServerRelativeUrl}')`;

		await RestCall({
			endPoint,
			method: 'delete',
			noReturn: true,
		});
	});
};
