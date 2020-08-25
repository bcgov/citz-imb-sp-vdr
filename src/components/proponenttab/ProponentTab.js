import React, { useEffect, useState, Fragment } from 'react'
import { Container, Grid } from '@material-ui/core'
import {
	ProponentLibrary,
	ProponentQuestionList,
	classes,
	GetCurrentProponent,
} from 'Components'

export const ProponentTab = () => {
	const [proponentID, setProponentID] = useState()
	const [proponentGroup, setProponentGroup] = useState()
	const [hasAssociatedProponent, setHasAssociatedProponent] = useState(false)

	const getCurrentProponent = async () => {
		const currentProponent = await GetCurrentProponent()
		if (currentProponent !== undefined) {
			setProponentID(currentProponent.UUID)
			setProponentGroup(currentProponent.GroupId)
			setHasAssociatedProponent(true)
		}
	}

	useEffect(() => {
		getCurrentProponent()
		return () => {}
	}, [])

	return (
		<Container maxWidth='xl'>
			<Grid container className={classes.root} spacing={2}>
				<Grid item xs={12}>
					<Grid container justify='center' spacing={2}>
						{hasAssociatedProponent ? (
							<Fragment>
								<ProponentLibrary proponent={proponentID} />
								<ProponentQuestionList
									proponent={proponentID}
									group={proponentGroup}
								/>
							</Fragment>
						) : (
							<div>No associated Proponent</div>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
