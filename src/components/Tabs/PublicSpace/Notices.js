import { SPList } from 'components/SharePoint';
import React, { useMemo, useCallback } from 'react';
import { useCurrentUser } from 'components/Hooks';
import { AddNotice } from './AddNotice'

export const Notices = () => {

	const currentUser = useCurrentUser()

	const uploadCallback = useCallback(
		() => {

		},
		[],
	)

	const additionalTableActions = useMemo(() => {
		if (currentUser.isOwner) {
			return [<AddNotice />]
		}

		return []
	}, [currentUser])

	const initialState = useMemo(() => {
		return { sortBy: [{ id: 'Modified', desc: true }], pageSize: 50 };
	}, []);

	return <SPList
		listName={'Notices'}
		uploadCallback={uploadCallback}
		additionalTableActions={additionalTableActions}
		columnFiltering={true}
		noRecordsText={'No notices have been posted yet'}
		initialState={initialState}
	/>
};
