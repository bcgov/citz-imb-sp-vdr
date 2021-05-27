import { RestCall } from '../RestCall/RestCall';

export const GetUser = async (userId) => {
	let endPoint = `/_api/web/GetUserById(${userId})`;

	const response = await RestCall({ endPoint: endPoint });

	return response.d;
};
