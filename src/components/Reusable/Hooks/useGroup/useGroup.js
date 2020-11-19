import { useState, useEffect } from 'react'
import { GetGroup, GetGroupMembers } from 'citz-imb-sp-utilities'

export const useGroup = (groupId, groupName) => {
	const [isLoading, setIsLoading] = useState(true)
	const [group, setGroup] = useState()
	const [members, setMembers] = useState([])

	const getGroup = async () => {
		try {
			const _group = await GetGroup({ groupId, groupName })
			console.log('_group :>> ', _group)
			setGroup(_group)
			const _members = await GetGroupMembers({ groupId, groupName })
			console.log('_members :>> ', _members)
			setMembers(_members)
			setIsLoading(false)
		} catch (error) {
			throw error
		}
	}

	// const createGroup = async () => {}
	const deleteGroup = async () => {}
	const updateGroup = async () => {}
	const addGroupMember = async () => {}
	const removeGroupMember = async () => {}

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
