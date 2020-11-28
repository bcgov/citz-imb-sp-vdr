import React from 'react'
import { ListTable } from 'Components'

export const Questions = (props) => {
	const { UUID } = props
	const listName = `${UUID}_Questions`

	const listOptions = {
		listName,
		columnFiltering: false,
		showTitle: false,
	}

	return <ListTable {...listOptions} />
}
