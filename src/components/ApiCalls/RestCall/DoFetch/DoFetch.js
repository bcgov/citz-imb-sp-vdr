export const DoFetch = async (url, endPoint, options) => {
	// console.log('DoFetch :>> ', {url, endPoint, options});

	// try {
		const response = await fetch(`${url}${endPoint}`, options);

		// console.log('DoFetch response :>> ', response);

		if (response.ok) {
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
			throw `${response.status} ${response.statusText} for ${url}${endPoint}`;
		}
	// } catch (error) {
		// console.error('DoFetch error :>> ', error);
	// }
};
