import { DoFetch } from '../../DoFetch/DoFetch';

export const GetContextWebInformation = async () => {
	// eslint-disable-next-line
	const siteAbsoluteUrl = _spPageContextInfo.siteAbsoluteUrl;

	const fetchResponse = await DoFetch(siteAbsoluteUrl, `/_api/contextinfo`, {
		method: 'post',
		headers: {
			Accept: 'application/json;odata=verbose',
			'content-type': 'application/json;odata=verbose',
		},
	});
	// console.log('GetContextWebInformation fetchResponse :>> ', fetchResponse);
	return fetchResponse.d.GetContextWebInformation;
};
