import { Home } from 'components/Tabs'
import { FormatText, FormikDialog } from 'components/Reusable'
import { useConfig, useCurrentUser, useLogAction } from 'components/Hooks'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

export const TermsOfService = () => {
  const [hasCookie, setHasCookie] = useState(false)
  const [dialogOptions, setDialogOptions] = useState({
    open: false,
    title: 'Terms of Service',
  })

  const config = useConfig()
  const currentUser = useCurrentUser()
  const logAction = useLogAction()

  useEffect(() => {
    if (!config.isLoading) {
      const cookies = new Cookies()
      const TOS = config.items.filter((item) => item.Key === 'TOS')[0]
      setDialogOptions({
        open: true,
        disableBackdropClick: true,
        submitButtonText: 'Accept',
        cancelButtonText: 'Reject',
        onSubmit: () => {
          cookies.set(`${TOS.Key}-${currentUser.id}-${TOS.Modified}`, true, {
            path: '/',
            maxAge: TOS.NumberValue * 24 * 60 * 60,
          })

          logAction('agreed to TOS', { snackbar: false })
          setHasCookie(true)
        },
        close: async () => {
          await logAction('disagreed to TOS', { snackbar: false })
          window.location = '/_layouts/signout.aspx'
        },
        title: TOS.TextValue,
        dialogContent: (
          <div
            dangerouslySetInnerHTML={{
              __html: FormatText(TOS.MultiTextValue),
            }}
          />
        ),
      })
      if (cookies.get(`${TOS.Key}-${currentUser.id}-${TOS.Modified}`)) {
        setHasCookie(true)
      }
    }
    return () => {}
  }, [config.isLoading, config.items, currentUser.id, logAction])

  if (hasCookie) return <Home />

  return <FormikDialog {...dialogOptions} />
}
