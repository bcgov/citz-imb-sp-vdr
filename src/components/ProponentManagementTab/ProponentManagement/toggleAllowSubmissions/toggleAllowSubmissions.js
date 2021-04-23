export const toggleAllowSubmissions = async (
	allowSubmissions,
	proponents,
	config
) => {
	if (allowSubmissions) {
		//set proponents libraries to contribute
	} else {
		//set proponents libraries to read only
	}

	//set config list allowSubmissions to !allowSubmissions

	const allowSubmissionsConfig = config.items.filter(
		(item) => item.Key === 'allowSubmissions'
	)[0]



	return !allowSubmissions
}
