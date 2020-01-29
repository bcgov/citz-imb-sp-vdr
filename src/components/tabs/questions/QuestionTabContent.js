import React from 'react'
import PublicQuestions from './PublicQuestions'
import PrivateQuestions from './PrivateQuestions'
import { Paper, Grid } from '@material-ui/core'
/**
 * presents the contents of the question and answer tab
 */
function QuestionTabContent() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper>
                    <PublicQuestions />
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

export default QuestionTabContent