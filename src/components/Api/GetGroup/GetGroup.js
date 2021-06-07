import { RestCall } from '../RestCall/RestCall';

export const GetGroup = async (groupId, {expand, filter, select }) => {
	let endPoint = `/_api/web/SiteGroups(${groupId})`;

	let endPointParameters = [];

	if (expand) endPointParameters.push(`$expand=${expand}`);
	if (filter) endPointParameters.push(`$filter=${filter}`);
	if (select) endPointParameters.push(`$select=${select}`);


	if (endPointParameters.length)
		endPoint = `${endPoint}?${endPointParameters.join('&')}`;

	try {
		const response = await RestCall({ endPoint});

		return response.d;
	} catch (error) {
		console.error('GetGroup error :>> ', {
			groupId,
			expand,
			filter,
			select,
		});
	}
};
