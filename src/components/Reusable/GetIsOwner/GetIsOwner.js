import {
	GetAssociatedGroups,
	GetGroupMembers,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'

export const GetIsOwner = async () => {
	const currentUser = await GetCurrentUser({})
	const assocGroups = await GetAssociatedGroups()
	const OwnerGroupMembers = await GetGroupMembers({
		groupId: assocGroups.AssociatedOwnerGroup.Id,
	})

	for (let i = 0; i < OwnerGroupMembers.length; i++) {
		if (currentUser.Id === OwnerGroupMembers[i].Id) {
            return true
		}
	}

	return false
}
