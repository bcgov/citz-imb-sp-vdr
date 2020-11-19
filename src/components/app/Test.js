import React, { useState, useEffect, Fragment } from 'react'

import { ProponentGroupDialog, PeoplePicker } from 'Components'
import { FormikTest } from 'components/Reusable/Reusable'
import { Grid } from '@material-ui/core'

export const Test = () => {
	const [open, setOpen] = useState(true)
	// return <ProponentGroupDialog proponentName={'Proponent A'}
	// open={open}
	// listName={'VBFD126_Questions'}
	// closeDialog={()=>{setOpen(false)}} />

	return (
		<Fragment>
			<Grid container direction={'column'} spacing={1}>
				<Grid item>
					<PeoplePicker
						getUserInfo={(value) => {
							console.log('value', value)
						}}
					/>
				</Grid>
			</Grid>
			<FormikTest
				open={open}
				close={() => {
					setOpen(false)
				}}
			/>
		</Fragment>
	)
}
