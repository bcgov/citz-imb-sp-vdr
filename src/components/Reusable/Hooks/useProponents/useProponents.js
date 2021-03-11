import { useList, SendConfirmationEmail } from 'components'
import { DeleteGroup, GetGroupMembers } from 'citz-imb-sp-utilities'
import { createProponent } from './createProponent/createProponent'
import { useCurrentUser, useConfig } from 'components'
import { createProponentGroup } from './createProponentGroup/createProponentGroup'
import { setProponentPermissions } from './setProponentPermissions/setProponentPermissions'

export const useProponents = () => {
	const currentUser = useCurrentUser()
	const proponents = useList({
		listName: 'Proponents',
		preRequisite: currentUser.Id,
	})
	const config = useConfig()

	const contactEmail = config.items.filter(
		(item) => item.Key === 'contactEmail'
	)[0]

	const add = async (proponentName) => {
		const { UUID, group } = await createProponent({ currentUser })
		await proponents.addItem([
			{
				Title: proponentName,
				UUID: UUID,
				Active: true,
				GroupId: group,
			},
		])
	}

	const setActive = async (UUID) => {
		const group = await createProponentGroup(UUID)

		await setProponentPermissions(UUID, group)

		const currentProponent = proponents.items.filter(
			(item) => item.UUID === UUID
		)[0]
		await proponents.updateItem([
			{ Id: currentProponent.Id, Active: true, GroupId: group },
		])
	}

	const setInactive = async (UUID) => {
		const currentProponent = proponents.items.filter(
			(item) => item.UUID === UUID
		)[0]
		await DeleteGroup({
			groupId: currentProponent.GroupId,
		})
		await proponents.updateItem([
			{ Id: currentProponent.Id, Active: false, GroupId: 0 },
		])
	}

	const addUser = async (userId, UUID) => {
		alert('addUserToProponent')
	}

	const removeUser = async (userId, UUID) => {
		alert('removeUserFromProponent')
	}

	const get = (UUID) => {
		return proponents.items.filter((item) => item.UUID === UUID)[0]
	}

	const sendEmailToProponents = async (props) => {
		const { subject, body } = props

		for (let i = 0; i < proponents.items.length; i++) {
			const groupMembers = await GetGroupMembers({
				groupId: proponents.items[i].GroupId,
			})
			if (groupMembers.length) {
				await SendConfirmationEmail({
					addresses: groupMembers.map((member) => member.LoginName),
					proponent: proponents.items[i].Title,
					subject,
					body,
					contactEmail,
				})
			}
		}
	}

	return {
		add,
		addUser,
		get,
		isLoading: proponents.isLoading,
		// proponents,
		items: proponents.items,
		removeUser,
		sendEmailToProponents,
		setActive,
		setInactive,
	}
}
