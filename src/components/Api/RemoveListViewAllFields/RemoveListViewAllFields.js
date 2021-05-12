import { RestCall } from '../RestCall/RestCall';

export const RemoveListViewAllFields = async ({ listName, viewGUID }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/Views('${viewGUID}')/ViewFields/removeallviewfields`;

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
