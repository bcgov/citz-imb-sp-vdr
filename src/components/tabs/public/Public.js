import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SPList } from 'Components'

export const Public = () => {
	const classes = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		paper: {
			height: 140,
			width: 100,
		},
		control: {
			padding: theme.spacing(2),
		},
	}))

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
	}

	const publicTab = ''

	const [libraryIsDirty, setLibraryIsDirty] = useState(true)
	const [listIsDirty, setListIsDirty] = useState(true)

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<Container maxWidth='xl'>
			<Paper variant='outlined'>{publicTab}</Paper>
			<Grid container className={classes.root} spacing={2}>
				<Grid item xs={12}>
					<Grid container justify='center' spacing={2}>
						<Grid key={'Documents'} item xs={6}>
							<Paper className={classes.paper}>
								<SPList
									listName='Documents'
									addItem={false}
									deleteItem={false}
									editItem={false}
									changeItemPermission={false}
									options={options}
									isDirty={libraryIsDirty}
									handleDirty={setLibraryIsDirty}
								/>
							</Paper>
						</Grid>
						<Grid key={'Questions'} item xs={6}>
							<Paper className={classes.paper}>
								<SPList
									listName='Questions'
									addItem={false}
									deleteItem={false}
									editItem={false}
									changeItemPermission={false}
									options={options}
									isDirty={listIsDirty}
									handleDirty={setListIsDirty}
								/>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
