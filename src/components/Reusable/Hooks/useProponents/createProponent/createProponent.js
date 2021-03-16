import { BreakListPermissionsInheritance } from 'components/ApiCalls';

import { MakeUniqueID } from './MakeUniqueID/MakeUniqueID';
import { createProponentGroup } from '../createProponentGroup/createProponentGroup';
import { createProponentLibrary } from './createProponentLibrary/createProponentLibrary';
import { createQuestionList } from './createQuestionList/createQuestionList';
import { setProponentPermissions } from '../setProponentPermissions/setProponentPermissions';

export const createProponent = async (props) => {
	const { currentUser } = props;
	const UUID = MakeUniqueID();

	await BreakListPermissionsInheritance({ listName: 'ActivityLog' });

	const group = await createProponentGroup(UUID);

	await createProponentLibrary({
		currentUser,
		listName: UUID,
		baseTemplate: 101,
	});

	await createQuestionList(`${UUID}_Questions`);

	await setProponentPermissions(UUID, group);

	return { UUID, group };
};
