import { useState, useEffect } from 'react'
import {
	AddUsersToGroup,
	GetGroup,
	GetGroupMembers,
	RemoveUsersFromGroup,
} from 'citz-imb-sp-utilities'

export const useGroup = (groupId, groupName) => {
	const [isLoading, setIsLoading] = useState(true)
	const [group, setGroup] = useState()
	const [members, setMembers] = useState([])

	const getGroup = async () => {
		try {
			const _group = await GetGroup({ groupId, groupName })
			setGroup(_group)
			const _members = await GetGroupMembers({ groupId, groupName })
			setMembers(_members)
			setIsLoading(false)
		} catch (error) {
			throw error
		}
	}

	// const createGroup = async () => {}
	const deleteGroup = async () => {}
	const updateGroup = async () => {}

	const addGroupMember = async (values) => {
		await AddUsersToGroup({
			groupId: group.Id,
			loginName: values.members.map((user) => user.Key),
		})
		await getGroup()
	}

	const removeGroupMember = async (userId) => {
		await RemoveUsersFromGroup({
			groupId: group.Id,
			userId,
		})
		await getGroup()
	}

	useEffect(() => {
		getGroup()
		return () => {}
	}, [])

	return {
		addGroupMember,
		// createGroup,
		deleteGroup,
		group,
		isLoading,
		members,
		removeGroupMember,
		updateGroup,
	}
}
