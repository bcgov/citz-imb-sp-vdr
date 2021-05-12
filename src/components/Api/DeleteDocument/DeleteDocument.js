import { RestCall } from '../RestCall/RestCall';

export const DeleteDocument = async (listName, itemId) => {
	await RestCall({
		endPoint: `/_api/web/GetFileByServerRelativeUrl('${itemId}')`,
		method: 'post',
		headers: {
			'x-http-method': 'delete',
			'if-match': '*',
		},
	});
};
