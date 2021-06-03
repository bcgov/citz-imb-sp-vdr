import { RestCall } from '../RestCall/RestCall';

export const AddFieldToList = async ({ listName, fields }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/fields`;

	if (!Array.isArray(fields)) fields = [fields];

	let responses = [];

	for (let i = 0; i < fields.length; i++) {
		fields[i].__metadata = {
			type: 'SP.FieldText',
		};
		const response = await RestCall({
			endPoint,
			method: 'post',
			body: fields[i],
		});

		responses.push(response.d);
	}


	return responses;
};
