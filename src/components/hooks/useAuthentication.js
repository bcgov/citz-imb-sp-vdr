export const useAuthentication = (apiCall) => {
	const bind = async (args) => {
		let response
		try {
			response = await apiCall(args)
		} catch {
			/* eslint-disable */
			window.location.pathname =
				_spPageContextInfo.webServerRelativeUrl +
				'/_layouts/15/Authenticate.aspx'
			/* eslint-enable */
			response = await apiCall(args)
		}
		return response
	}

	return bind
}
