import { RestCall } from '../RestCall/RestCall';

export const GetListDefaultView = async ({ listName }) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/DefaultView?$expand=ViewFields`;

	const response = await RestCall({ endPoint });

	return response.d;
};
