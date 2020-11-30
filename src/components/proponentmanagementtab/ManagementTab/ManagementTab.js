import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core'

import {
	HorizontalTabPanel,
	Library,
	Questions,
	Membership,
	OverView,
} from 'Components'

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export const ManagementTab = (props) => {
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Paper>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='virtual document room tabs'>
					<Tab label='Overview' {...a11yProps(0)} />
					<Tab label='Library' {...a11yProps(1)} />
					<Tab label='Questions' {...a11yProps(2)} />
					<Tab label='Membership' {...a11yProps(3)} />
				</Tabs>
			</AppBar>

			<HorizontalTabPanel value={value} index={0}>
				<OverView {...props} />
			</HorizontalTabPanel>

			<HorizontalTabPanel value={value} index={1}>
				<Library {...props} />
			</HorizontalTabPanel>

			<HorizontalTabPanel value={value} index={2}>
				<Questions {...props} />
			</HorizontalTabPanel>

			<HorizontalTabPanel value={value} index={3}>
				<Membership {...props} />
			</HorizontalTabPanel>
		</Paper>
	)
}