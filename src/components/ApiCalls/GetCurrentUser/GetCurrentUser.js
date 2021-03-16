import { RestCall } from '../RestCall/RestCall';

export const GetCurrentUser = async ({expand}) => {
	let endPoint = '/_api/web/CurrentUser';

	if (expand) endPoint = `${endPoint}?$expand=${expand}`;

	const response = await RestCall({ endPoint: endPoint });

	return response.d;
};
