import { RestCall } from '../RestCall/RestCall';

export const RemovePermissionsFromList = async ({
	listName,
	principalId,
	roleDefId,
}) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/RoleAssignments/removeRoleAssignment(principalid=${principalId},roledefid=${roleDefId})`;

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
