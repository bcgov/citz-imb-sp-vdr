import React, { useEffect } from 'react'

const dev = window.dev

const ppLibraries = [
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clienttemplates.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clientforms.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clientpeoplepicker.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/autofill.js'
	}
]

export default function PeoplePicker({ schema, elementName, getUserInfo }) {
	let loadDelay = 1000
	if (dev) loadDelay = 1000

	useEffect(() => {
		//append libraries needed for peoplepicker
		ppLibraries.forEach(library => {
			const head = document.getElementsByTagName('head')[0]
			const element = document.createElement('script')
			element.type = library.type
			element.src = library.src
			head.appendChild(element)
		})

		const observer = new MutationObserver(mutations => {
			let userArray = []

			for (let i = 0; i < mutations[0].addedNodes.length; i++) {
				userArray.push({
					displayName: mutations[0].addedNodes[i].childNodes[1].title,
					account: mutations[0].addedNodes[i].attributes.sid.value
				})
			}
			getUserInfo(userArray)
		})

		// Render and initialize the picker.
		// Pass the ID of the DOM element that contains the picker, an array of initial
		// PickerEntity objects to set the picker value, and a schema that defines
		// picker properties.
		setTimeout(function() {
			// eslint-disable-next-line
			SPClientPeoplePicker_InitStandaloneControlWrapper(
				elementName,
				null,
				schema
			)
			let el = document.querySelector(
				`#${elementName}_TopSpan_ResolvedList`
			)
			observer.observe(el, { childList: true })
		}, loadDelay)

		return () => {
			observer.disconnect()
		}
	}, [])

	return <div id={elementName}></div>
}
