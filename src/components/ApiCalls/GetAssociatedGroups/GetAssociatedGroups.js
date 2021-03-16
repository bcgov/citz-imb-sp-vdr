import { RestCall } from '../RestCall/RestCall'

export const GetAssociatedGroups = async (baseurl) => {

	const AssociatedOwnerGroup = await RestCall({ url: baseurl, endPoint: `/_api/Web/AssociatedOwnerGroup` })


	return new Promise((resolve, reject) => {
		Promise.all([
			,
			RestCall({ url: baseurl, endPoint: `/_api/Web/AssociatedMemberGroup` }),
			RestCall({
				url: baseurl,
				endPoint: `/_api/Web/AssociatedVisitorGroup`,
			}),
		])
			.then((response) => {
				resolve({
					AssociatedOwnerGroup: response[0].d,
					AssociatedMemberGroup: response[1].d,
					AssociatedVisitorGroup: response[2].d,
				})
			})
			.catch((response) => {
				reject(`GetAssociatedGroups::${response}`)
			})
	})
}