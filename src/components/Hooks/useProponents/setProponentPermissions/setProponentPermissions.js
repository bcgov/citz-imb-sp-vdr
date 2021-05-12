import {
	AddPermissionsToList,
	AddPermissionsToSite,
	GetRoleDefinitions
} from 'components/Api';

export const setProponentPermissions = async (UUID, groupId) => {

	const roles = await GetRoleDefinitions({});

	await AddPermissionsToSite({
		principalId: groupId,
		roleDefId: roles['Read'].Id,
	});

	await AddPermissionsToList({
		listName: UUID,
		principalId: groupId,
		roleDefId: roles['Contribute'].Id,
	});

	await AddPermissionsToList({
		listName: `${UUID}_Questions`,
		principalId: groupId,
		roleDefId: roles['Contribute'].Id,
	});

	await AddPermissionsToList({
		listName: 'ActivityLog',
		principalId: groupId,
		roleDefId: roles['Read with Add'].Id,
	});
};
