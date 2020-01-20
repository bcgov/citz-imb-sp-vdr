import React from 'react'
import { Container, Grid } from '@material-ui/core'
import Proponents from './Proponents'
//import Groups from './Groups'

function ManagementTabContent() {
    return (
        <Container>
            <h2>Site Management</h2>
            <Grid container spacing={1}>
                <Grid item>
                    <Proponents />
                </Grid>
                <Grid item></Grid>
            </Grid>
        </Container>
    )
}

export default ManagementTabContent