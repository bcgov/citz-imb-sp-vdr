import React, { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
import { useLogAction, TermsOfService } from 'Components'

export const Logon = () => {
	const { isLoading, logAction } = useLogAction()
	const device = deviceDetect()

	useEffect(() => {
		if (!isLoading)
			logAction(
				`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`,
				false
			)

		return () => {}
	}, [isLoading])

	if (isLoading) {
		return null
	}

	return <TermsOfService />
}
