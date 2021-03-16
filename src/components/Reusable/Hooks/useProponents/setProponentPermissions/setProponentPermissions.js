import {
	AddPermissionsToList,
	AddPermissionsToSite,
	GetRoleDefinitions,
} from 'components/ApiCalls';

export const setProponentPermissions = async (UUID, groupId) => {
	console.log('setProponentPermissions state :>> GetRoleDefinitions');
	const roles = await GetRoleDefinitions({});
	console.log('setProponentPermissions state :>> AddPermissionsToSite');
	await AddPermissionsToSite({
		principalId: groupId,
		roleDefId: roles['Read'].Id,
	});
	console.log('setProponentPermissions state :>> AddPermissionsToSite');
	await AddPermissionsToList({
		listName: UUID,
		principalId: groupId,
		roleDefId: roles['Contribute'].Id,
	});
	console.log('setProponentPermissions state :>> AddPermissionsToSite');
	await AddPermissionsToList({
		listName: `${UUID}_Questions`,
		principalId: groupId,
		roleDefId: roles['Contribute'].Id,
	});
	console.log('setProponentPermissions state :>> AddPermissionsToSite');
	await AddPermissionsToList({
		listName: 'ActivityLog',
		principalId: groupId,
		roleDefId: roles['Read with Add'].Id,
	});
};
