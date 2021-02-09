import { GetListItems } from 'citz-imb-sp-utilities'

export const GetDocuments = async (listName) => {
	const response = await GetListItems({listName, expand: 'FieldValuesAsHtml,FieldValuesAsText,FieldValuesForEdit'})

	console.log('GetDocuments response :>> ', response)

	return response
}
