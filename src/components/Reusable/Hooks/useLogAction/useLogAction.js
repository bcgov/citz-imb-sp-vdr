import { AddItemsToList } from 'citz-imb-sp-utilities'
import * as moment from 'moment'
import { useSnackbar } from 'notistack'
import { useCurrentUser } from 'Components'

export const useLogAction = () => {
	const currentUser = useCurrentUser()
	const { enqueueSnackbar } = useSnackbar()

	const logAction = async (message, snackbar = true, variant = 'success') => {
		const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
		const activity = `${currentUser.name} ${message} on ${timeStamp}`
		try {
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
	}

	return logAction
}
