import { useState, useEffect } from 'react'

export const useGroup = (groupId, groupName) => {
	const createGroup = async () => {}
	const deleteGroup = async () => {}
	const updateGroup = async () => {}
	const addGroupMember = async () => {}
	const removeGroupMember = async () => {}

	useEffect(() => {
		if (groupId) {
		} else if (groupName) {
		} else {
			throw 'useGroups requires a groupId or groupName'
		}

		return () => {}
	}, [])

	return {
		createGroup,
		deleteGroup,
		updateGroup,
		addGroupMember,
		removeGroupMember,
	}
}
