import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Paper, makeStyles } from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'

import {
	HorizontalTabPanel,
	Proponent,
	Public,
	ProponentManagementTab,
	SiteManagement,
	useCurrentUser,
} from 'components'

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		'& span.MuiTab-wrapper': {
			textTransform: 'capitalize',
		},
		'& button.MuiTab-textColorSecondary': {
			color: '#efefef',
		},
		'& button.MuiTab-textColorSecondary.Mui-selected': {
			color: '#E3A82B',
		},
	},
}))

export const AppTabs = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const currentUser = useCurrentUser()

	return (
		<Paper className={classes.root}>
			<AppBar position='static'>
				<Tabs
					value={value}
					textColor='secondary'
					onChange={handleChange}
					aria-label='virtual document room tabs'>
					<Tab
						label='Public Space'
						icon={<HomeIcon />}
						{...a11yProps(0)}
					/>
					<Tab
						label='My Organization'
						icon={<QuestionAnswerIcon />}
						{...a11yProps(1)}
					/>
					{currentUser.isOwner ? (
						<Tab
							label='Proponent Management'
							icon={<PeopleIcon />}
							{...a11yProps(2)}
						/>
					) : null}
					{currentUser.isOwner ? (
						<Tab
							label='Site Management'
							icon={<SettingsIcon />}
							{...a11yProps(3)}
						/>
					) : null}
				</Tabs>
			</AppBar>
			<HorizontalTabPanel value={value} index={0}>
				<Public />
			</HorizontalTabPanel>
			<HorizontalTabPanel value={value} index={1}>
				<Proponent />
			</HorizontalTabPanel>
			{currentUser.isOwner ? (
				<HorizontalTabPanel value={value} index={2}>
					<ProponentManagementTab />
				</HorizontalTabPanel>
			) : null}
			{currentUser.isOwner ? (
				<HorizontalTabPanel value={value} index={3}>
					<SiteManagement />
				</HorizontalTabPanel>
			) : null}
		</Paper>
	)
}
