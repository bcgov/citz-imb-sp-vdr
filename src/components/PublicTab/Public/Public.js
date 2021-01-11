import React, { useState } from 'react'
import { Tabs, Tab, makeStyles } from '@material-ui/core'
import { VerticalTabPanel } from 'Components'
import { PublicLibrary } from '../PublicLibrary/PublicLibrary'
import { PublicQuestionList } from '../PublicQuestionList/PublicQuestionList'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}))

export const Public = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<Tabs
				orientation='vertical'
				value={value}
				onChange={handleChange}
				aria-label='Vertical tabs example'
				className={classes.tabs}>
				<Tab label='Public Documents' {...a11yProps(0)} />
				<Tab label='Public Questions' {...a11yProps(1)} />
			</Tabs>
			<VerticalTabPanel value={value} index={0}>
				<PublicLibrary />
			</VerticalTabPanel>
			<VerticalTabPanel value={value} index={1}>
				<PublicQuestionList />
			</VerticalTabPanel>
		</div>
	)
}
