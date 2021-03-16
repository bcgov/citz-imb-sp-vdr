import { GetListItems } from 'components/ApiCalls';

export const GetDocuments = async (listName) => {
	const response = await GetListItems({ listName, expand: 'File' });

	return response;
};
