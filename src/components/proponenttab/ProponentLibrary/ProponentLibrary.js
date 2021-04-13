import { Alert } from '@material-ui/lab';
import { useCurrentUser } from 'components';
import { SPLibrary } from 'components/SharePoint';
import React from 'react';

export const ProponentLibrary = () => {
	const currentUser = useCurrentUser();

	const listName = currentUser.proponent;

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>;

	return (
		<SPLibrary
			listName={listName}
			title={'Submitted Documents'}
			allowUpload={true}
			allowDelete={true}
		/>
	);
};
