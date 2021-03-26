import { RestCall } from '../RestCall/RestCall';

export const AddListViewField = async ({ listName, viewGUID, field }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/Views('${viewGUID}')/ViewFields/addviewfield('${field}')`;

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
