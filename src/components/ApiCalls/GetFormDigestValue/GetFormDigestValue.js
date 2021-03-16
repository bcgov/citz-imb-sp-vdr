import { GetContextWebInformation } from '../GetContextWebInformation/GetContextWebInformation';

export const GetFormDigestValue = async () => {
	const response = await GetContextWebInformation();

	return response.FormDigestValue;
};
