import { CreateGroup, ChangeGroupOwner } from 'citz-imb-sp-utilities'

export const CreateProponentGroup = async (props) => {
	const { groupName, associatedGroups } = props
	const group = await CreateGroup({ groupName: groupName })

	try {
		ChangeGroupOwner({
			groupId: group.Id,
			ownerGroupId: associatedGroups.AssociatedOwnerGroup.Id,
		})
	} catch {
		console.warn('unable to change group owner')
	}

	return group
}
