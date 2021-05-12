import { RestCall } from '../RestCall/RestCall';

export const CreateView = async ({
	listName,
	viewQuery,
	viewName,
	PersonalView = false,
}) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/views`;

	let body = {
		__metadata: {
			type: 'SP.View',
		},
		PersonalView,
		Title: viewName,
	};

	if (viewQuery) body.viewQuery = viewQuery;

	const response = await RestCall({
		endPoint,
		method: 'post',
		body,
	});

	return response.d;
};
