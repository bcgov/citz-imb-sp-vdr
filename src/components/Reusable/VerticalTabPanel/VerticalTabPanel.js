import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		flex: 1,
	},
})

export const VerticalTabPanel = (props) => {
	const { children, value, index, ...other } = props
	const classes = useStyles()

	return (
		<div
		className={classes.root}
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && (
				<Typography component='div' >{children}</Typography>
			)}
		</div>
	)
}
