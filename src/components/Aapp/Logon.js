import { TermsOfService } from 'components/TermsOfServices'
import { useCurrentUser, useLogAction } from 'components/Hooks'
import { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
export const Logon = () => {
  const currentUser = useCurrentUser()

  const logAction = useLogAction()

  useEffect(() => {
    const device = deviceDetect()
    logAction(
      `logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`,
      { snackbar: false }
    )
    return () => {}
  }, [currentUser, logAction])

  return <TermsOfService />
}
