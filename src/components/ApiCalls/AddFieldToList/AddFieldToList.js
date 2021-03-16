import { RestCall } from '../RestCall/RestCall';

export const AddFieldToList = async ({ listName, fields }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/fields`;

	if (!Array.isArray(fields)) fields = [fields];

	let responses = [];

	fields.forEach(async (field) => {
		field.__metadata = {
			type: 'SP.FieldText',
		};
		const response = await RestCall({
			endPoint,
			method: 'post',
			body: field,
		});

		responses.push(response.d);
	});

	return responses;
};
