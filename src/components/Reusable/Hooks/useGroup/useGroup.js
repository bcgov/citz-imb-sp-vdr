import { useState, useEffect } from 'react'
import {
	AddUsersToGroup,
	GetGroup,
	GetGroupMembers,
	RemoveUsersFromGroup,
	ChangeGroupOwner,
	DeleteGroup,
} from 'citz-imb-sp-utilities'

import { useQuery, useQueryClient, useMutation } from 'react-query'

export const useGroup = (props) => {
	const { groupName, groupId } = props

	const groupQueryName = [`group-${groupName ?? groupId}`, 'group']
	const membersQueryName = [`group-${groupName ?? groupId}`, 'members']

	const group = useQuery(groupQueryName, () =>
		GetGroup({ groupName, groupId })
	)
	const members = useQuery(membersQueryName, () =>
		GetGroupMembers({ groupName, groupId })
	)

	const queryClient = useQueryClient()

	const addMemberMutation = useMutation(
		(values) =>
			AddUsersToGroup({
				groupId: group.data.Id,
				loginName: values.members.map((user) => user.Key),
			}),
		{
			onMutate: (values) => {
				const previousValues = queryClient.getQueryData(
					membersQueryName
				)

				queryClient.setQueryData(membersQueryName, (oldValues) => {
					console.log('oldValues :>> ', oldValues)
					console.log('values :>> ', values)

					return [
						...oldValues,
						...values.members.map((member, index) => {
							return {
								Id: `temp_${index}`,
								Email: member.EntityData.Email,
								Title: member.EntityData.Title,
								LoginName: member.Key,
							}
						}),
					]
				})

				return () =>
					queryClient.setQueryData(membersQueryName, previousValues)
			},
			onError: (error, values, previousValues) =>
				queryClient.setQueryData(membersQueryName, previousValues),
			onSuccess: () => queryClient.refetchQueries(membersQueryName),
		}
	)

	const removeMemberMutation = useMutation(
		(userId) =>
			RemoveUsersFromGroup({
				groupId: group.data.Id,
				userId,
			}),
		{
			onMutate: (userId) => {
				const previousValues = queryClient.getQueryData(
					membersQueryName
				)

				queryClient.setQueryData(membersQueryName, (oldValues) =>
					oldValues.filter((member) => member.Id !== userId)
				)

				return () =>
					queryClient.setQueryData(membersQueryName, previousValues)
			},
			onError: (error, values, previousValues) =>
				queryClient.setQueryData(membersQueryName, previousValues),
			onSuccess: () => queryClient.refetchQueries(membersQueryName),
		}
	)

	const changeGroupOwnerMutation = useMutation(
		(newOwnerId) =>
			ChangeGroupOwner({
				groupId: group.data.Id,
				ownerGroupId: newOwnerId,
			}),
		{
			onSuccess: () => queryClient.refetchQueries(groupQueryName),
		}
	)
	const deleteGroupMutation = useMutation(
		() =>
			DeleteGroup({
				groupId: group.data.Id,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	)

	return {
		members: members.data,
		group: group.data,
		isLoading: members.isLoading ? true : group.isLoading ? true : false,
		isError: members.isError ? true : group.isError ? true : false,
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
	}
}
