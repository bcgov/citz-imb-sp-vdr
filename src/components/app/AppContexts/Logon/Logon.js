import React, { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
import { useLogAction, TermsOfService, useCurrentUser } from 'components'
import {LinearProgress} from '@material-ui/core'
export const Logon = () => {
	const currentUser = useCurrentUser()

	const logAction = useLogAction()

	useEffect(() => {
		if (!currentUser.isLoading) {
			const device = deviceDetect()
			logAction(
				`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`,
				false
			)
		}
		return () => {}
	}, [currentUser.isLoading])

	if (currentUser.isLoading) return <LinearProgress />

	return <TermsOfService />
}
