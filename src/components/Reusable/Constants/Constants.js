import { makeStyles } from '@material-ui/core/styles'

export const configListName = 'config'
export const configTOSFilter = `Key eq 'TOS'`
export const tableOptions = {
	search: false,
	sorting: false,
	paging: false,
	pageSize: 20,
	draggable: false,
	actionsColumnIndex: -1,
}
export const classes = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing(2),
	},
}))