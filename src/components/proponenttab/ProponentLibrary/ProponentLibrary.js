import { Alert } from '@material-ui/lab';
import {
	useCurrentUser,
	useProponents,
	useConfig,
	useLogAction,
} from 'components';
import { SPLibrary } from 'components/SharePoint';
import React from 'react';

export const ProponentLibrary = () => {
	const currentUser = useCurrentUser();
	const proponents = useProponents();
	const config = useConfig();
	const logAction = useLogAction();

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>;

	const listName = currentUser.proponent;

	const proponentDocumentEmail = config.filter(
		(item) => item.Key === 'proponentDocumentEmail'
	)[0];

	const uploadCallback = async (files) => {
		for (let i = 0; i < files.length; i++) {
			logAction(`successfully uploaded ${files[i].name}`);
		}
		await proponents.sendEmailToProponents({
			subject: proponentDocumentEmail.TextValue,
			body: proponentDocumentEmail.MultiTextValue,
		});
		logAction(`successfully sent email notifications`);
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
