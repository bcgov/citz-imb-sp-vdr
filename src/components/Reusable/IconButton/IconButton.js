import React from 'react'
import { IconButton as MUIIconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export const IconButton = (props) => {
	const { onClick, type='', ...iconProps } = props
	let icon

	switch (type.toLowerCase()) {
		case 'add':
			icon = <AddCircleIcon />
			break
		default:
			icon = <HelpIcon />
			break
	}

	return (
		<MUIIconButton
			size={'small'}
			color={'secondary'}
			onClick={onClick}
			{...iconProps}>
			{icon}
		</MUIIconButton>
	)
}
