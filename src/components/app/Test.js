import React from 'react';
import { Membership } from 'components/ProponentManagementTab/Membership/Membership';

export const Test = () => {
	console.log('Test');

	return <Membership groupId={9} proponentName={'My Proponent'} />;
};
