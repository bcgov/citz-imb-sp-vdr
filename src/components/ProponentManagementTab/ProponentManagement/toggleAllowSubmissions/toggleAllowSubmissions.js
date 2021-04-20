export const toggleAllowSubmissions = async (
	allowSubmissions,
	proponents,
	config
) => {
	console.log('proponents :>> ', proponents)
	if (allowSubmissions) {
		//set proponents libraries to contribute
	} else {
		//set proponents libraries to read only
	}

	//set config list allowSubmissions to !allowSubmissions
	console.log('config :>> ', config)
	const allowSubmissionsConfig = config.data.filter(
		(item) => item.Key === 'allowSubmissions'
	)[0]
	console.log('allowSubmissionsConfig :>> ', allowSubmissionsConfig)
	await config.updateItem({
		Id: allowSubmissionsConfig.Id,
		YesNoValue: !allowSubmissions,
	})

	return !allowSubmissions
}
