import {
	AddUsersToGroup,
	ChangeGroupOwner,
	DeleteGroup,
	RemoveUsersFromGroup,
} from 'components/ApiCalls';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getGroup } from './getGroup/getGroup';

export const useGroup = (props) => {
	const { groupId } = props;

	const queryName = ['Group', groupId];

	const group = useQuery(queryName, () => getGroup(groupId));

	const queryClient = useQueryClient();

	const addMemberMutation = useMutation(
		(values) =>
			AddUsersToGroup({
				groupId: groupId,
				loginNames: values.members.map((user) => user.Key),
			}),
		{
			onMutate: async (newMembers) => {
				await queryClient.cancelQueries(queryName);

				const previousValues = queryClient.getQueryData(queryName);

				queryClient.setQueryData(queryName, (oldValues) => {
					let newValues = [...oldValues.members];

					newMembers.members.map((member, index) => {
						newValues.push({
							Id: `temp_${index}`,
							Email: member.EntityData.Email,
							Title: member.EntityData.DisplayName,
							LoginName: member.Key,
						});
						return member;
					});

					return { group: oldValues.group, members: newValues };
				});

				return { previousValues };
			},
			onError: (error, newItem, context) => {
				console.error('error: ', error);
				queryClient.setQueryData(queryName, context.previousValues);
			},
		}
	);

	const removeMemberMutation = useMutation(
		(userId) =>
			RemoveUsersFromGroup({
				groupId,
				userIds: userId,
			}),
		{
			onMutate: (userId) => {
				const previousValues = queryClient.getQueryData(queryName);

				queryClient.setQueryData(queryName, (oldValues) => {
					return {
						...oldValues,
						members: oldValues.members.filter(
							(member) => member.Id !== userId
						),
					};
				});

				return { previousValues };
			},
			onError: (error, values, context) =>
				queryClient.setQueryData(queryName, context.previousValues),
		}
	);

	const changeGroupOwnerMutation = useMutation(
		(newOwnerId) =>
			ChangeGroupOwner({
				groupId: group.data.Id,
				ownerGroupId: newOwnerId,
			}),
		{
			onSuccess: () => queryClient.refetchQueries(queryName),
		}
	);
	const deleteGroupMutation = useMutation(
		() =>
			DeleteGroup({
				groupId,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries(queryName),
		}
	);

	return {
		...group.data,
		isLoading: group.isLoading,
		isError: group.isError,
		isMutating: changeGroupOwnerMutation.isLoading
			? true
			: deleteGroupMutation.isLoading
			? true
			: addMemberMutation.isLoading
			? true
			: removeMemberMutation.isLoading
			? true
			: false,
		changeGroupOwner: changeGroupOwnerMutation.mutateAsync,
		deleteGroup: deleteGroupMutation.mutateAsync,
		addMember: addMemberMutation.mutateAsync,
		removeMember: removeMemberMutation.mutateAsync,
	};
};
