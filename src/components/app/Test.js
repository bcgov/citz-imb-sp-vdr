import React, { useRef } from 'react'
import { Questions } from '../ProponentManagementTab/Questions/Questions'
// import { useList } from 'components'

export const Test = () => {
	console.log('Test')
	const UUID = useRef('VC4D143')

	// const config = useList({ listName: 'Config' })

	// console.log('config :>> ', config);

	// return <div>Hello There</div>
	return <Questions UUID={UUID.current} />
}
