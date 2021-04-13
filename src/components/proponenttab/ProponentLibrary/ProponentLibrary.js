import { Alert } from '@material-ui/lab';
import { useCurrentUser, useProponents, useConfig } from 'components';
import { SPLibrary } from 'components/SharePoint';
import React from 'react';

export const ProponentLibrary = () => {
	const currentUser = useCurrentUser();
	const proponents = useProponents();
	const config = useConfig();

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>;

	const listName = currentUser.proponent;

	const proponentDocumentEmail = config.filter(
		(item) => item.Key === 'proponentDocumentEmail'
	)[0];

	const uploadCallback = async () => {
		console.log('sending email...')
		await proponents.sendEmailToProponents({
			subject: proponentDocumentEmail.TextValue,
			body: proponentDocumentEmail.MultiTextValue,
		});
	};

	return (
		<SPLibrary
			listName={listName}
			title={'Submitted Documents'}
			allowUpload={true}
			allowDelete={true}
			uploadCallback={uploadCallback}
		/>
	);
};
