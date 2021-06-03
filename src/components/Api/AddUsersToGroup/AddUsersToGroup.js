import { RestCall } from '../RestCall/RestCall';

export const AddUsersToGroup = async ({ groupId, groupName, loginNames }) => {
	let endPoint;

	if (!Array.isArray(loginNames)) loginNames = [loginNames];

	if (groupId) {
		endPoint = `/_api/web/SiteGroups(${groupId})/Users`;
	} else {
		endPoint = `/_api/web/SiteGroups/getByName('${groupName}')/Users`;
	}

	const responses = [];

	await loginNames.forEach(async (loginName) => {
		const response = await RestCall({
			endPoint: endPoint,
			method: 'post',
			body: {
				__metadata: {
					type: 'SP.User',
				},
				LoginName: loginName,
			},
		});

		responses.push(response);
	});

	return responses;
};
