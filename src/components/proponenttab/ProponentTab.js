import React, { useEffect, useState, Fragment } from 'react'
import {
	GetCurrentUser,
	GetListItems,
	AddItemsToList,
	GetGroupMembers,
	SendEmail,
} from 'citz-imb-sp-utilities'
import { Container, Grid, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
	SPList,
	LogAction,
	ProponentLibrary,
	ProponentQuestionList,
	tableOptions as options,
} from 'Components'

export const ProponentTab = () => {
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

	const [proponent, setProponent] = useState()
	const [hasAssociatedProponent, setHasAssociatedProponent] = useState(false)

	const [listName, setListName] = useState()
	const [isLoaded, setIsLoaded] = useState(false)
	const [group, setGroup] = useState()



	const getProponentID = async () => {
		const currentUser = await GetCurrentUser({ expand: 'Groups' })
		const proponents = await GetListItems({ listName: 'Proponents' })
		for (let i = 0; i < proponents.length; i++) {
			for (let j = 0; j < currentUser.Groups.results.length; j++) {
				if (
					currentUser.Groups.results[j].Id === proponents[i].GroupId
				) {
					console.log('proponents[i] :>> ', proponents[i]);
					setProponent(proponents[i].UUID)
					setHasAssociatedProponent(true)
				}
			}
		}
	}

	useEffect(() => {
		getProponentID()

		// Promise.all([
		// 	GetCurrentUser({ expand: 'Groups' }),
		// 	GetListItems({ listName: 'Proponents' }),
		// ]).then((response) => {
		// 	const [currentUser, listItems] = response

		// 	for (let i = 0; i < listItems.length; i++) {
		// 		for (let j = 0; j < currentUser.Groups.results.length; j++) {
		// 			if (
		// 				currentUser.Groups.results[j].Id ===
		// 				listItems[i].GroupId
		// 			) {
		// 				setLibraryName(listItems[i].UUID)
		// 				setListName(`${listItems[i].UUID}_Questions`)
		// 				setGroup(listItems[i].GroupId)
		// 				setIsLoaded(true)
		// 			}
		// 		}
		// 	}
		// })

		return () => {}
	}, [])

	return (
		<Container maxWidth='xl'>
			<Grid container className={classes.root} spacing={2}>
				<Grid item xs={12}>
					<Grid container justify='center' spacing={2}>
						{hasAssociatedProponent ? (
							<Fragment>
								<ProponentLibrary proponent={proponent} />
								<ProponentQuestionList proponent={proponent} />
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
