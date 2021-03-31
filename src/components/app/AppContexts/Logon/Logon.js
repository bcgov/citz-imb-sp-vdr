import { TermsOfService, useCurrentUser, useLogAction } from 'components';
import React, { useEffect } from 'react';
import { deviceDetect } from 'react-device-detect';
export const Logon = () => {
	const currentUser = useCurrentUser();

	const logAction = useLogAction();

	useEffect(() => {
		const device = deviceDetect();
		logAction(
			`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`,
			false
		);
		return () => {};
	}, [currentUser, logAction]);

	return <TermsOfService />;
};
