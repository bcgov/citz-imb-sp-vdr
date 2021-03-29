import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {
	useCurrentUser,
	useLogAction,
	FormikDialog,
	FormatText,
	Home,
	useConfig,
} from 'components';
import { LinearProgress } from '@material-ui/core';

export const TermsOfService = () => {
	const [hasCookie, setHasCookie] = useState(false);
	const [dialogOptions, setDialogOptions] = useState();
	const config = useConfig();

	const currentUser = useCurrentUser();
	const logAction = useLogAction();
	const cookies = new Cookies();

	useEffect(() => {
		const TOS = config.filter((item) => item.Key === 'TOS')[0];
		setDialogOptions({
			onSubmit: () => {
				cookies.set(
					`${TOS.Key}-${currentUser.id}-${TOS.Modified}`,
					true,
					{
						path: '/',
						maxAge: TOS.NumberValue * 24 * 60 * 60,
					}
				);

				logAction('agreed to TOS', false);
				setHasCookie(true);
			},
			close: async () => {
				await logAction('disagreed to TOS', false);
				window.location = '/_layouts/signout.aspx';
			},
			title: TOS.TextValue,
			dialogContent: (
				<div
					dangerouslySetInnerHTML={{
						__html: FormatText(TOS.MultiTextValue),
					}}
				/>
			),
		});
		if (cookies.get(`${TOS.Key}-${currentUser.id}-${TOS.Modified}`)) {
			setHasCookie(true);
		}

		return () => {};
	}, [currentUser]);

	if (!hasCookie)
		return (
			<FormikDialog
				open={true}
				submitButtonText={'Accept'}
				cancelButtonText={'Reject'}
				{...dialogOptions}
			/>
		);

	return <Home />;
};
