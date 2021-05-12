import { GetGroup, GetGroupMembers } from 'components/Api';

export const getGroup = async (groupId) => {
	const groupInfo = await GetGroup({ groupId });
	const members = await GetGroupMembers({ groupId });

	return { group: groupInfo.d, members };
};
