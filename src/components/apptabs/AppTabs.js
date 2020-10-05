import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

import HomeIcon from '@material-ui/icons/Home'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'

import {
	GetIsOwner,
	ProponentTab,
	PublicTab,
	ProponentManagementTab,
	SiteManagement,
	TabPanel,

} from 'Components'

// TabPanel.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.any.isRequired,
// 	value: PropTypes.any.isRequired,
// }

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
	const [isOwner, setIsOwner] = useState(false)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const isCurrentUserAnOwner = async () => {
		setIsOwner(await GetIsOwner())
	}

	useEffect(() => {
		isCurrentUserAnOwner()
		return () => {}
	}, [])

	return (
		<div className={classes.root}>
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
					{isOwner ? (
						<Tab
							label='Proponent Management'
							icon={<PeopleIcon />}
							{...a11yProps(2)}
						/>
					) : (
						''
					)}
					{isOwner ? (
						<Tab
							label='Site Management'
							icon={<SettingsIcon />}
							{...a11yProps(3)}
						/>
					) : (
						''
					)}
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Paper>
					<h2>Public Space</h2>
					<PublicTab />
				</Paper>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Paper>
					<ProponentTab />
				</Paper>
			</TabPanel>
			{isOwner ? (
				<TabPanel value={value} index={2}>
					<Paper>
						<ProponentManagementTab />
					</Paper>
				</TabPanel>
			) : (
				''
			)}
			{isOwner ? (
				<TabPanel value={value} index={3}>
					<Paper>
						<SiteManagement />
					</Paper>
				</TabPanel>
			) : (
				''
			)}
		</div>
	)
}
