import React from 'react';
import { GroupTable } from 'components';

export const Membership = ({ GroupId, Title }) => {
	return <GroupTable groupId={GroupId} proponentName={Title} />;
};
