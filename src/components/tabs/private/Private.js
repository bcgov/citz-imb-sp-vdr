import React from 'react'
import {PrivateQuestions} from './PrivateQuestions'
import { Paper, Grid } from '@material-ui/core'

export const Private = () => {
	return (
		<Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper>
                    
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <PrivateQuestions />
                </Paper>
            </Grid>
        </Grid>
	)
}
