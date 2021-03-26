import { RestCall } from '../RestCall/RestCall';

export const GetSite = async ({ expand, filter, select }) => {
	let endPoint = `/_api/web`;
	let endPointParameters = [];

	if (expand) endPointParameters.push(`$expand=${expand}`);
	if (filter) endPointParameters.push(`$filter=${filter}`);
	if (select) endPointParameters.push(`$select=${select}`);

	if (endPointParameters.length)
		endPoint = `${endPoint}?${endPointParameters.join('&')}`;

	const response = await RestCall({ endPoint });

	return response.d;
};
