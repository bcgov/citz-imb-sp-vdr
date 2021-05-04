import { useCurrentUser } from 'components'
import { AddItemsToList } from 'components/ApiCalls'
import * as moment from 'moment'
import { useSnackbar } from 'notistack'
import { useCallback } from 'react'

export const useLogAction = () => {
  const currentUser = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

  const logAction = useCallback(
    async (message, options = {}) => {
      const {
        snackbar = true,
        variant = 'success',
        snackbarOnly = false,
      } = options
      const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
      const activity = `${currentUser.name} ${message} on ${timeStamp}`
      try {
        if (!snackbarOnly)
          await AddItemsToList({
            listName: 'ActivityLog',
            items: {
              Title: activity,
              User: currentUser.name,
              Proponent: currentUser.proponent,
            },
          })

        console.warn('LogAction :>> ', activity)

        if (snackbar)
          enqueueSnackbar(message, {
            variant,
          })
      } catch (error) {
        console.error('error :>> ', error)
        enqueueSnackbar(`Error: ${message} - ${error}`, {
          variant: 'error',
        })
      }
    },
    [currentUser, enqueueSnackbar]
  )

  return logAction
}
