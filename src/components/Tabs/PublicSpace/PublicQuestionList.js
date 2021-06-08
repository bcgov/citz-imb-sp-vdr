import { SPList } from 'components/SharePoint';
import React, { useMemo } from 'react';

export const PublicQuestionList = () => {
	const initialState = useMemo(() => {
		return { sortBy: [{ id: 'Modified', desc: true }], pageSize: 50 };
	}, []);
	return <SPList listName={'Questions'} initialState={initialState} columnFiltering={true} />;
};
