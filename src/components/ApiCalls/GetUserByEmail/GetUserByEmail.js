import { RestCall } from '../RestCall/RestCall';

export const GetUserByEmail = async ({ email }) => {
	let endPoint = `/_api/web/SiteUsers?$select=id,title,email,LoginName&$filter=Email eq '${email}'`;

	const response = RestCall({ endPoint });

	return response.d.results;
};
