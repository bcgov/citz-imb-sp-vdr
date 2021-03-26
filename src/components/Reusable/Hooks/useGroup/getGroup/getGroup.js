import { GetGroup, GetGroupMembers } from 'components/ApiCalls';

export const getGroup = async (groupId) => {
	const groupInfo = await GetGroup({ groupId });
	const members = await GetGroupMembers({ groupId });

	return { group: groupInfo.d, members };
};
