import React from 'react'
import { SPDialog, SPTable } from 'Components'
import moment from 'moment'

export const ViewActivityLog = () => {
	const setDefaultSort = (list) => {
		console.log('setDefaultSort :>> ', list)
		for (let i = 0; i < list.columns.length; i++) {
			if (list.columns[i].title === 'Created') {
				list.columns[i].defaultSort = 'desc'
				list.columns[i].customSort = (a, b) => moment(a.Created) - moment(b.Created)
				console.log('column :>> ', list.columns[i])
            }
            if (list.columns[i].title === 'Action') {
				list.columns[i].sorting = false
				console.log('column :>> ', list.columns[i])
            }

		}
		return list
	}
	return (
		<SPDialog
			open={true}
			title={'View Activity Log'}
			showSave={false}
			cancelButtonText={'Close'}
			//cancelButtonAction = (event) => {}
			fullScreen={true}>
			<SPTable
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
                    filtering: true
				}}
			/>
		</SPDialog>
	)
}
