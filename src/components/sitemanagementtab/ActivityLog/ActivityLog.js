import { SPList } from 'components/SharePoint';
import React, { useMemo } from 'react';

export const ActivityLog = () => {
	const initialState = useMemo(() => {
		return { sortBy: [{ id: 'Modified', desc: true }], pageSize: 50 };
	}, []);
	return <SPList listName={'ActivityLog'} initialState={initialState} />;
};
