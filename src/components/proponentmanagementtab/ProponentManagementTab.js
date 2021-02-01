import React from 'react'
import { ProponentManagement } from './ProponentManagement/ProponentManagement'
import { useList, useProponents } from 'Components'

export const ProponentsContext = React.createContext()

export const ProponentManagementTab = () => {
	const proponents = useProponents()

	return (
		<ProponentsContext.Provider value={proponents}>
			<ProponentManagement />
		</ProponentsContext.Provider>
	)
}
