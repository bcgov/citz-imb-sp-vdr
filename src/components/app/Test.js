import React from 'react'
import { AddPermissionsToActivityLog } from 'Components'
import { Button } from '@material-ui/core'
import { GetGroup, GetRoleDefinitions } from 'citz-imb-sp-utilities'

export const Test = () => {
	const handleClick = async (element) => {
		const group = await GetGroup({ groupId: 9 })
		const roles = await GetRoleDefinitions({})
		AddPermissionsToActivityLog(group, roles)
	}

	return (
		<Button variant='outlined' color='primary' onClick={handleClick}>
			Add Permssion
		</Button>
	)
}
