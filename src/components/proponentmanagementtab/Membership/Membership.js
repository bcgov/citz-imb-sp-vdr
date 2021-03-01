import React from 'react'
import { GroupTable } from 'components'

export const Membership = (props) => {
	const { GroupId, Title } = props

	const tableOptions = {
		groupId: GroupId,
		proponent: Title,
		showTitle: false,
		addRecord: true,
	}

	return <GroupTable {...tableOptions} />
}
