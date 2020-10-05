import React from 'react'

import { GetList } from 'citz-imb-sp-utilities'
import Moment from 'react-moment'

const getList = async (listName) => {
	let list = await GetList({
		listName: listName,
		expand: 'DefaultView,DefaultView/ViewFields,Fields,Items,Items/File',
	})
	console.log('getList :>> ', list)

	return list
}

export const getListAndItems = async (listName) => {
	let title, columns, items

	let list = await getList(listName)

	title = list.Title

	let listColumns = {}
	for (let i = 0; i < list.Fields.results.length; i++) {
		listColumns[list.Fields.results[i].InternalName] = {
			Title: list.Fields.results[i].Title,
			FieldTypeKind: list.Fields.results[i].FieldTypeKind,
		}
	}

	//Table Columns
	if (list.BaseTemplate === 101) {
		columns = list.DefaultView.ViewFields.Items.results.map((field) => {
			let fieldObject = {
				title: listColumns[field].Title,
				field: field,
				fieldTypeKind: listColumns[field].FieldTypeKind,
			}

			if (field === 'LinkFilenameNoMenu') {
				fieldObject.render = (rowdata) => {
					return (
						<a href={rowdata.File.ServerRelativeUrl}>
							{rowdata.File.Name}
						</a>
					)
				}
			}
			if (field === 'LinkFilename') {
				fieldObject.render = (rowdata) => {
					return (
						<a href={rowdata.File.ServerRelativeUrl}>
							{rowdata.File.Name} - edit
						</a>
					)
					//TODO: make edit dropdown
				}
			}

			return fieldObject
		})
	} else {
		columns = list.DefaultView.ViewFields.Items.results.map((field) => {
			let fieldObject = {
				title: listColumns[field].Title,
				field: field,
				fieldTypeKind: listColumns[field].FieldTypeKind,
			}

			if (listColumns[field].FieldTypeKind === 4) {
				//datetime
				fieldObject.render = (rowdata) => {
					return (
						<Moment
							fromNowDuring={3600000}
							format={'dddd, MMMM Do, YYYY @ h:mm a'}>
							{rowdata[field]}
						</Moment>
					)
				}
			} else if (
				listColumns[field].FieldTypeKind === 3 //multilinetext
			) {
				fieldObject.render = (rowdata) => {
					return (
						<div
							dangerouslySetInnerHTML={{
								__html: rowdata[field],
							}}
						/>
					)
				}
			}

			if (field === 'LinkTitle') {
				fieldObject.render = (rowdata) => {
					return (
						<a href={rowdata.File.ServerRelativeUrl}>
							{rowdata.Title}
						</a>
					)
				}
			}
			return fieldObject
		})
	}

	items = list.Items.results

	return { title, columns, items }
}
