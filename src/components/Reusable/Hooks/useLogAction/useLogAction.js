import { useContext } from 'react'
import { AddItemsToList } from 'citz-imb-sp-utilities'
import * as moment from 'moment'
import { useSnackbar } from 'notistack'
import { UserContext } from 'Components'

export const useLogAction = () => {
	const currentUser = useContext(UserContext)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const logAction = async (message, snackbar = true) => {
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
					variant: 'success',
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
