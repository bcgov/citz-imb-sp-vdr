import { RestCall } from '../RestCall/RestCall';

export const UpdateField = async ({ listName, fieldName, field }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/fields/getByTitle('${fieldName}')`;

	field.__metadata = {
		type: 'SP.FieldText',
	};

	const response = await RestCall({
		endPoint,
		method: 'patch',
		body: field,
	});
	return response;
};
