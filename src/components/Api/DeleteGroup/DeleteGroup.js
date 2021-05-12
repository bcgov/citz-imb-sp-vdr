import { RestCall } from '../RestCall/RestCall';

export const DeleteGroup = async ({ groupName, groupId }) => {
	let endPoint;

	if (groupId) {
		endPoint = `/_api/web/SiteGroups/removebyid('${groupId}')`;
	} else {
		endPoint = `/_api/web/SiteGroups/removebyloginname('${groupName}')`;
	}

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
