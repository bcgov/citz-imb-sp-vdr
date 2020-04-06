import React, { useEffect, useState } from 'react'
import { SPList } from '../../sharepoint/SPList'
import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GetListItems } from 'citz-imb-sp-utilities'

export const Private = () => {
	const classes = makeStyles(theme => ({
		root: {
			flexGrow: 1
		},
		paper: {
			height: 140,
			width: 100
		},
		control: {
			padding: theme.spacing(2)
		}
	}))

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
	}

	const [privateTab, setPrivateTab] = useState('')

	useEffect(() => {
		GetListItems({listName:'Config', filter:"Key eq 'PrivateTab'"}).then(results => {
			setPrivateTab(() => {
				return <div dangerouslySetInnerHTML={{__html: results[0].MultiTextValue}}></div>
			})
		})

		return () => {}
	}, [])

	return (
		<Container maxWidth='xl'>
			<Paper variant='outlined'>{privateTab}</Paper>
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
								/>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
