import {
	ChangeGroupOwner,
	CreateGroup,
	GetAssociatedGroups
} from 'components/Api';

export const createProponentGroup = async (UUID) => {
	const associatedGroups = await GetAssociatedGroups();
	const group = await CreateGroup({ groupName: UUID });

	try {
		ChangeGroupOwner({
			groupId: group.Id,
			ownerGroupId: associatedGroups.AssociatedOwnerGroup.Id,
		});
	} catch {
		console.warn('unable to change group owner');
	}

	return group.Id;
};
