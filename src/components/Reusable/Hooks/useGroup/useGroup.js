import {
	AddUsersToGroup,
	RemoveUsersFromGroup,
	ChangeGroupOwner,
	DeleteGroup,
} from 'components/ApiCalls';

import { getGroup } from './getGroup/getGroup';

import { useQuery, useQueryClient, useMutation } from 'react-query';

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
				// console.log('mutating...');
				await queryClient.cancelQueries(queryName);

				const previousValues = queryClient.getQueryData(queryName);

				queryClient.setQueryData(queryName, (oldValues) => {
					let newValues = [...oldValues.members];

					newMembers.members.map((member, index) => {
						console.log('member :>> ', member);
						newValues.push({
							Id: `temp_${index}`,
							Email: member.EntityData.Email,
							Title: member.EntityData.DisplayName,
							LoginName: member.Key,
						});
						return member;
					});

					// console.log('newValues :>> ', newValues);

					return { group: oldValues.group, members: newValues };
				});

				return { previousValues };
			},
			onError: (error, newItem, context) => {
				console.log('error: ', error);
				queryClient.setQueryData(queryName, context.previousValues);
			},
			onSettled: async () => {
				// console.log('settling...')
				// await queryClient.cancelQueries(queryName);
				// await queryClient.invalidateQueries(queryName);
				// console.log('done settling')
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
				// console.log('mutating...');
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
			onSettled: () => {
				// console.log('settling...')
				// queryClient.refetchQueries(queryName);
			},
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
