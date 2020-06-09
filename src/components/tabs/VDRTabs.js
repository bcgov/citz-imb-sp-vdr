import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Typography, Box, Tabs, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

import HomeIcon from '@material-ui/icons/Home'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import SettingsIcon from '@material-ui/icons/Settings'

import { Private } from './private/Private'
import { Public } from './public/Public'
import { SiteManagement } from './sitemanagement/SiteManagement'

import {
	GetAssociatedGroups,
	GetGroupMembers,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'

/**
 * Present the tabs for the site
 * @param {*} props
 */
function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

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

export const VDRTabs = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const [isManager, setIsManager] = useState(false)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	useEffect(() => {
		Promise.all([
			GetAssociatedGroups(),
			GetCurrentUser({})
		])
		.then((response) => {
			const [assocGroups, currentUser] = response
			GetGroupMembers({ groupId: assocGroups.AssociatedOwnerGroup.Id }).then(
				(groupMembers) => {
					for(let i=0;i<groupMembers.length;i++){
						if(currentUser.Id === groupMembers[i].Id){
							setIsManager(true)
						}
					}
				}
			)
		})
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
					{isManager ? (
						<Tab
							label='Site Management'
							icon={<SettingsIcon />}
							{...a11yProps(2)}
						/>
					) : (
						''
					)}
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Paper>
					<h2>Public Space</h2>
					<Public />
				</Paper>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Paper>
					<Private />
				</Paper>
			</TabPanel>
			{isManager ? (
				<TabPanel value={value} index={2}>
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
