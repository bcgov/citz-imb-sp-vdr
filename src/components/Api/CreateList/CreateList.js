import { RestCall } from '../RestCall/RestCall';

export const CreateList = async ({
	listName,
	allowContentTypes = false,
	baseTemplate = 100,
	contentTypesEnabled = false,
	description = '',
}) => {
	let endPoint = `/_api/web/Lists`;
	let body = {
		__metadata: {
			type: 'SP.List',
		},
		Title: listName,
		AllowContentTypes: allowContentTypes,
		BaseTemplate: baseTemplate,
		ContentTypesEnabled: contentTypesEnabled,
		Description: description,
	};

	const response = await RestCall({
		endPoint,
		method: 'post',
		body,
	});

	return response.d;
};
