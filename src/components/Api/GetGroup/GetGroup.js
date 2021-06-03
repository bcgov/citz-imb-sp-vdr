import { RestCall } from '../RestCall/RestCall';

export const GetGroup = async ({ groupId }) => {
	let endPoint = `/_api/web/SiteGroups(${groupId})`;

	const response = await RestCall({ endPoint: endPoint });

	return response;
};
