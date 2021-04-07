import { BreakListPermissionsInheritance } from 'components/ApiCalls';
import { createProponentGroup } from '../createProponentGroup/createProponentGroup';
import { setProponentPermissions } from '../setProponentPermissions/setProponentPermissions';
import { createProponentLibrary } from './createProponentLibrary/createProponentLibrary';
import { createQuestionList } from './createQuestionList/createQuestionList';
import { MakeUniqueID } from './MakeUniqueID/MakeUniqueID';

export const createProponent = async (props) => {
	const { currentUser, logAction } = props;
	const UUID = MakeUniqueID();

	await BreakListPermissionsInheritance({ listName: 'ActivityLog' });

	logAction('creating proponent group...', true, 'info', true);
	const group = await createProponentGroup(UUID);
	logAction('proponent group created', true, 'success', true);

	logAction('creating proponent library...', true, 'info', true);
	await createProponentLibrary({
		currentUser,
		listName: UUID,
		baseTemplate: 101,
	});
	logAction('proponent library created', true, 'success', true);

	logAction('creating proponent question list...', true, 'info', true);
	await createQuestionList(`${UUID}_Questions`);
	logAction('proponent question list created', true, 'success', true);

	logAction('setting proponent permissions...', true, 'info', true);
	await setProponentPermissions(UUID, group);
	logAction('proponent permissions set', true, 'success', true);

	return { UUID, group };
};
