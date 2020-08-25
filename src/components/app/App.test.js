import React from 'components/App/node_modules/react'
import ReactDOM from 'components/App/node_modules/react-dom'
import { App } from './App'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<App />, div)
})
