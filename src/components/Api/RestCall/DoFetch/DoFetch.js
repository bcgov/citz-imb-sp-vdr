export const DoFetch = async (url, endPoint, options, doNotReturnResponse = false, returnBlob = false) => {
	const response = await fetch(`${url}${endPoint}`, options);
	if (response.ok) {
		if (doNotReturnResponse) return null;
		if (response.status === 204) {
			//!no content
			return;
		} else if (response.status === 304) {
			console.warning(
				`${response.status} ${response.statusText} ${endPoint}`
			);
			return response.json();
		} else {
			return returnBlob ? response.blob() : response.json();
		}
	} else {
		throw new Error(`${response.status} ${response.statusText} for ${url}${endPoint}`);
	}
};
