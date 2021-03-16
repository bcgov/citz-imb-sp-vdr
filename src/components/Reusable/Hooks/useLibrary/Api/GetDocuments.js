import { GetListItems } from 'citz-imb-sp-utilities'

export const GetDocuments = async (listName) => {
	const response = await GetListItems({listName, expand: 'File'})

	return response
}
