import { RestCall } from '../RestCall/RestCall';

export const BreakListPermissionsInheritance = async ({
	listName,
	listGUID,
	copy = true,
	clear = false,
}) => {
	let endPoint;

	if (listGUID) {
		endPoint = `/_api/web/Lists('${listGUID}')/breakroleinheritance(copyRoleAssignments=${copy},clearSubscopes=${clear})`;
	} else {
		endPoint = `/_api/web/Lists/getByTitle('${listName}')/breakroleinheritance(copyRoleAssignments=${copy},clearSubscopes=${clear})`;
	}

	const response = await RestCall({
		endPoint,
		method: 'post',
	});

	return response.d;
};
