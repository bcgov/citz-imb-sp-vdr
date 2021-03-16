import {
	GetCurrentUser,
	GetListItems,
	GetAssociatedGroups,
} from 'components/ApiCalls';

export const getCurrentUser = async () => {
	let name,
		id,
		email,
		proponent,
		isProponent = false,
		isOwner = false;

	try {
		const user = await GetCurrentUser({ expand: 'Groups' });

		name = user.Title;
		id = user.Id;
		email = user.Email;

		const proponents = await GetListItems({ listName: 'Proponents' });

		for (let i = 0; i < proponents.length; i++) {
			for (let j = 0; j < user.Groups.results.length; j++) {
				if (proponents[i].GroupId === user.Groups.results[j].Id) {
					proponent = proponents[i].UUID;
					isProponent = true;
					break;
				}
			}
		}

		const associatedGroups = await GetAssociatedGroups();

		for (let i = 0; i < user.Groups.results.length; i++) {
			if (
				user.Groups.results[i].Id ===
				associatedGroups.AssociatedOwnerGroup.Id
			) {
				isOwner = true;
				break;
			}
		}
	} catch (err) {
		console.error('error getting current user :>> ', err);
	}

	return {
		name,
		id,
		email,
		proponent,
		isProponent,
		isOwner,
	};
};
