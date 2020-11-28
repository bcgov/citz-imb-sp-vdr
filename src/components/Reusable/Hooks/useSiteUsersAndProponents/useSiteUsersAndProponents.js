import { useState, useEffect } from 'react'
import { GetGroupMembers, GetListItems } from 'citz-imb-sp-utilities'

export const useSiteUsersAndProponents = () => {
	const listName = 'Proponents'
	const [isLoading, setIsLoading] = useState(true)
	const [users, setUsers] = useState()
	const [proponents, setProponents] = useState()
	const [groups, setGroups] = useState()
	const [membership, setMembership] = useState()

	const refresh = async () => {
		let _users = []
		let _proponents = []
		let _memberShip = []
		let _groups = []

		try {
			const items = await GetListItems({ listName })
			_proponents = items.map((item) => {
				return item.UUID
			})
			_groups = items.map((item) => {
				return item.GroupId
			})

			for (let i = 0; i < _groups.length; i++) {
				if (_groups[i] > 0) {
					let members = await GetGroupMembers({
						groupId: _groups[i],
					})

					for (let j = 0; j < members.length; j++) {
						_users.push(members[i])
					}
				}
			}

			setUsers(_users)
			setMembership(_memberShip)
			setGroups(_groups)
			setProponents(_proponents)
		} catch (err) {
			console.error('error getting users :>> ', err)
		}

		return
	}

	useEffect(() => {
		refresh()
		return () => {}
	}, [])

	useEffect(() => {
		if (users && membership && groups && proponents) {
			setIsLoading(false)

		}
		return () => {}
	}, [users, membership, groups, proponents])

	return { users, proponents, groups, refresh, isLoading }
}
