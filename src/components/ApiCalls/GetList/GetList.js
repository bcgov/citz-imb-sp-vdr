import { RestCall } from '../RestCall/RestCall';

export const GetList = async ({ listName, expand, filter, select }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')`;
	let endPointParameters = [];

	if (expand) endPointParameters.push(`$expand=${expand}`);
	if (filter) endPointParameters.push(`$filter=${filter}`);
	if (select) endPointParameters.push(`$select=${select}`);

	if (endPointParameters.length)
		endPoint = `${endPoint}?${endPointParameters.join('&')}`;

	const response = await RestCall({ endPoint: endPoint });

	return response.d;
};
