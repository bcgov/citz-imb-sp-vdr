import React, { useEffect } from 'react'
// import { Questions } from '../ProponentManagementTab/Questions/Questions'
import { useListNew } from './newUseList'

export const Test = () => {
	// const options = {
	// 	UUID: 'V68C58C',
	// }

	const list = useListNew('Config')

	useEffect(() => {
		// console.log('list.isLoading :>> ', list.isLoading);

		return () => {}
	}, [list])

	return (
		<ul>
			{list.isLoading ? null : list.items.map((item, index) => (
				<li key={index}>{item.Title}</li>
			))}
		</ul>
	)

	// return <Questions {...options} />
}
