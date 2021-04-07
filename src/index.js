// import * as serviceWorker from './Helper/serviceWorker'
import { App } from 'components'
import React from 'react'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import ReactDOM from 'react-dom'

setTimeout(() => {
	const rootEl = document.createElement('div')
	rootEl.setAttribute('id', 'vdr-root')
	const el = document.getElementById('DeltaPlaceHolderMain')
	el.appendChild(rootEl)

	ReactDOM.render(<App />, rootEl)
}, 1000)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
