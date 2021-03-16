import { RestCall } from '../RestCall/RestCall';

export const AddPermissionsToSite = async ({ principalId, roleDefId }) => {
	let endPoint = `/_api/web/RoleAssignments/addRoleAssignment(principalid=${principalId},roledefid=${roleDefId})`;

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
