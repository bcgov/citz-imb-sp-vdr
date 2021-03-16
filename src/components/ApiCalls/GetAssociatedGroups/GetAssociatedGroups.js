import { RestCall } from '../RestCall/RestCall';

export const GetAssociatedGroups = async (baseurl) => {
	const AssociatedOwnerGroup = await RestCall({
		endPoint: `/_api/Web/AssociatedOwnerGroup`,
	});
	const AssociatedMemberGroup = await RestCall({
		endPoint: `/_api/Web/AssociatedMemberGroup`,
	});
	const AssociatedVisitorGroup = await RestCall({
		endPoint: `/_api/Web/AssociatedVisitorGroup`,
	});

	return {
		AssociatedOwnerGroup,
		AssociatedMemberGroup,
		AssociatedVisitorGroup,
	};
};
