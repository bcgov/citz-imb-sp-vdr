import { RestCall } from '../RestCall/RestCall';

export const GetRoleDefinitions = async () => {
	let endPoint = `/_api/web/RoleDefinitions`;

	const response = await RestCall({ endPoint: endPoint });

	let obj = {};
	for (let i = 0; i < response.d.results.length; i++) {
		obj[response.d.results[i].Name] = response.d.results[i];
	}

	return obj;
};
