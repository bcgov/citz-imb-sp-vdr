import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { SendConfirmationEmail } from 'components';

export const removeItemsDialogOptions = (props) => {
	const {
		original,
		setDialog,
		proponentGroup,
		logAction,
		proponentName,
		config,
	} = props;

	setDialog({
		dialogContent: (
			<Alert>
				<AlertTitle>Remove {original.Title} from Group?</AlertTitle>
				{original.Title} will no longer have access to this site
			</Alert>
		),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await proponentGroup.removeMember(original.Id);
				logAction(
					`removed ${original.Title} from ${proponentName} group`
				);

				const removeUserEmail = config.filter(
					(item) => item.Key === 'removeUserEmail'
				)[0];

				const contactEmail = config.filter(
					(item) => item.Key === 'contactEmail'
				)[0];

				console.log('contactEmail :>> ', contactEmail);
				await SendConfirmationEmail({
					addresses: contactEmail.TextValue,
					proponent: proponentName,
					subject: removeUserEmail.TextValue,
					body: removeUserEmail.MultiTextValue,
					additionalReplacementPairs: [
						{
							searchvalue: /\[UserName\]/g,
							newvalue: original.Title,
						},
					],
					contactEmail,
				});
				logAction(
					`sent ${removeUserEmail.Title} to ${contactEmail.TextValue}`
				);
				setSubmitting(false);
				setDialog({ open: false });
			} catch (error) {
				throw error;
			}
		},
		open: true,
		close: () => {
			setDialog({ open: false });
		},
		title: 'Remove Member',
	});
};
