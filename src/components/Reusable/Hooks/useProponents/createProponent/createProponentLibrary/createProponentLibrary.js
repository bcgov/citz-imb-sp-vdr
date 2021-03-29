import {
	AddPermissionsToList,
	BreakListPermissionsInheritance,
	CreateList,
	GetRoleDefinitions,
	GetAssociatedGroups,
	RemovePermissionsFromList,
} from 'components/ApiCalls';

export const createProponentLibrary = async (props) => {
	const { currentUser, listName, ...listProps } = props;

	const roles = await GetRoleDefinitions({});
	const associatedGroups = await GetAssociatedGroups();
	const list = await CreateList({ listName, ...listProps });

	await BreakListPermissionsInheritance({
		listName,
		copy: false,
		clear: true,
	});

	await AddPermissionsToList({
		//owners
		listName,
		principalId: associatedGroups.AssociatedOwnerGroup.Id,
		roleDefId: roles['Full Control'].Id,
	});

	await AddPermissionsToList({
		//members
		listName,
		principalId: associatedGroups.AssociatedMemberGroup.Id,
		roleDefId: roles['Contribute'].Id,
	});

	await AddPermissionsToList({
		//visitors
		listName,
		principalId: associatedGroups.AssociatedVisitorGroup.Id,
		roleDefId: roles['Read'].Id,
	});

	await RemovePermissionsFromList({
		listName,
		principalId: currentUser.data.id,
		roleDefId: roles['Full Control'].Id,
	});

	return list;
};
