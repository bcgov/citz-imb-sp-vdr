import { makeStyles } from '@material-ui/core/styles'


export const configListName = 'config'
export const configTOSFilter = `Key eq 'TOS'`

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
