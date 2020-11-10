import React, { useState, useEffect } from 'react'
import { SPDialog, ListTable, useSiteUsersAndProponents } from 'Components'
import moment from 'moment'

export const ViewActivityLog = ({ open, close = () => {} }) => {
	const [users, proponents, groups, refresh] = useSiteUsersAndProponents()
	const [proponentFilter, setProponentFilter] = useState({})
	const [userFilter, setUserFilter] = useState({})
	useEffect(() => {
		let proponentsObject = {}

		if (proponents.length > 0) {
			for (let i = 0; i < proponents.length; i++) {
				proponentsObject[proponents[i]] = proponents[i]
			}
		}

		setProponentFilter(proponentsObject)
		return () => {}
	}, [proponents])

	useEffect(() => {
		let usersObject = {}

		if (users.length > 0) {
			for (let i = 0; i < users.length; i++) {
				usersObject[users[i].Title] = users[i].Title
			}
		}
		setUserFilter(usersObject)
		return () => {}
	}, [users])

	const setDefaultSort = async (list) => {
		for (let i = 0; i < list.columns.length; i++) {
			if (list.columns[i].title === 'Created') {
				list.columns[i].defaultSort = 'desc'
				list.columns[i].customSort = (a, b) =>
					moment(a.Created) - moment(b.Created)
				list.columns[i].filtering = false
			}
			if (list.columns[i].title === 'Action') {
				list.columns[i].sorting = false
				list.columns[i].filtering = false
			}
			if (list.columns[i].title === 'User') {
				list.columns[i].sorting = false
				list.columns[i].filtering = true
				list.columns[i].lookup = userFilter
			}
			if (list.columns[i].title === 'Proponent') {
				list.columns[i].sorting = false
				list.columns[i].filtering = true
				list.columns[i].lookup = proponentFilter
			}
		}
		return list
	}

	return (
		<SPDialog
			open={open}
			title={'View Activity Log'}
			showSave={false}
			cancelButtonText={'Close'}
			cancelButtonAction={close}
			fullScreen={true}>
			<ListTable
				listName={'ActivityLog'}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermissions={false}
				onClickCallback={(action, event, rowdata) => {
					console.info(`default onClickCallback on action ${action}`)
				}}
				refresh={false}
				tableTitle={'Activity Log'}
				additionalData={setDefaultSort}
				options={{
					search: true,
					sorting: true,
					pageSize: 20,
					filtering: true,
				}}
			/>
		</SPDialog>
	)
}
