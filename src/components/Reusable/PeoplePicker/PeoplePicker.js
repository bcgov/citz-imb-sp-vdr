import React, { useState, useEffect } from 'react'
import './PeoplePicker.css'
import MutationObserver from 'mutation-observer'

export const PeoplePicker = ({ schema, elementName, getUserInfo }) => {
	const ppLibraries = [
		{
			type: 'text/javascript',
			src: '_layouts/15/clienttemplates.js',
		},
		{
			type: 'text/javascript',
			src: '_layouts/15/clientforms.js',
		},
		{
			type: 'text/javascript',
			src: '_layouts/15/clientpeoplepicker.js',
		},
		{
			type: 'text/javascript',
			src: '_layouts/15/autofill.js',
		},
	]
	const [resolvedListElement, setResolvedListElement] = useState()

	const observer = new MutationObserver(() => {
		let userArray = []

		for (let i = 0; i < resolvedListElement.children.length; i++) {
			userArray.push(resolvedListElement.children[i].attributes.sid.value)
		}

		getUserInfo(userArray)
	})

	useEffect(() => {
		//append libraries needed for peoplepicker
		ppLibraries.forEach((library) => {
			const head = document.getElementsByTagName('head')[0]
			const element = document.createElement('script')
			element.type = library.type
			element.src = library.src
			head.appendChild(element)
		})

		// Render and initialize the picker.
		// Pass the ID of the DOM element that contains the picker, an array of initial
		// PickerEntity objects to set the picker value, and a schema that defines
		// picker properties.

		// eslint-disable-next-line
		ExecuteOrDelayUntilScriptLoaded(function () {
			setTimeout(() => {
				// eslint-disable-next-line
				SPClientPeoplePicker_InitStandaloneControlWrapper(
					elementName,
					null,
					schema
				)
				setResolvedListElement(
					document.querySelector(
						`#${elementName}_TopSpan_ResolvedList`
					)
				)
			}, 1000)
		}, 'clienttemplates.js')

		return () => {}
	}, [])
	
	useEffect(() => {
		if (resolvedListElement) {
			observer.observe(resolvedListElement, { childList: true })
		}

		return () => {
			observer.disconnect()
		}
	}, [resolvedListElement])

	return <div id={elementName}></div>
}
