import {Reauthenticate} from './Reauthenticate/Reauthenticate'

export const DoFetch = async (url, endPoint, options, doNotReturnResponse = false) => {
	// console.log('endPoint :>> ', endPoint, options);
	// try {
	const response = await fetch(`${url}${endPoint}`, options);
	if (response.ok) {
		if (doNotReturnResponse) return null;
		if (response.status === 204) {
			//no content
			return;
		} else if (response.status === 304) {
			console.warning(
				`${response.status} ${response.statusText} ${endPoint}`
			);
			return response.json();
		} else {
			return response.json();
		}
	} else {
		if (response.status === 403) {
			console.log('403 response :>> ', response);
			Reauthenticate()
		} else {
			throw `${response.status} ${response.statusText} for ${url}${endPoint}`;
		}
	}
	// } catch (error) {
	// 	console.error('DoFetch error :>> ', error);
	// }
};
