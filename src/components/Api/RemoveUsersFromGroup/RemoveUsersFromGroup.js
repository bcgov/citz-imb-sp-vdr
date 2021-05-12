import { RestCall } from '../RestCall/RestCall';

export const RemoveUsersFromGroup = async ({
	groupId,
	loginNames,
	userIds,
}) => {
	let endPoint = `/_api/web/SiteGroups(${groupId})/Users`;

	let responses = [];

	if (userIds) {
		if (!Array.isArray(userIds)) userIds = [userIds];

		userIds.forEach(async (userId) => {
			const response = await RestCall({
				endPoint: `${endPoint}/removeByID(${userId})`,
				method: 'post',
			});

			responses.push(response);
		});
	} else {
		if (!Array.isArray(loginNames)) loginNames = [loginNames];

		loginNames.forEach(async (loginName) => {
			const response = await RestCall({
				endPoint: `${endPoint}/removeByLoginName('${loginName}')`,
				method: 'post',
			});

			responses.push(response);
		});
	}

	return responses.map((response) => response.d);
};
