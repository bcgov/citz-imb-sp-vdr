import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { PublicLibrary, PublicQuestionList, classes } from 'Components'

export const PublicTab = () => {
	return (
		<Container maxWidth='xl'>
			<Grid container className={classes.root} spacing={2}>
				<Grid item xs={12}>
					<Grid container justify='center' spacing={2}>
						<PublicLibrary />
						<PublicQuestionList />
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
