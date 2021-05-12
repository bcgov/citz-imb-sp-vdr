import { RestCall } from '../RestCall/RestCall';

export const AddPermissionsToList = async ({
	listName,
	principalId,
	roleDefId,
}) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/RoleAssignments/addRoleAssignment(principalid=${principalId},roledefid=${roleDefId})`;

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
