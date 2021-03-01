import React, { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
import { useLogAction, TermsOfService } from 'components'

export const Logon = () => {
	const logAction = useLogAction()

	useEffect(() => {
		const device = deviceDetect()
		logAction(
			`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`,
			false
		)
		return () => {}
	})

	return <TermsOfService />
}
