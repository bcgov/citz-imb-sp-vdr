import { GetListItems } from 'citz-imb-sp-utilities'

import { configListName } from 'Components'

const getListItems = async () => {
	return await GetListItems({
		listName: configListName,
		filter: `Key eq 'TOS'`,
	})
}

export const GetTOSCookie = async () => {
	const response = await getListItems()

	console.log('response[0].Key :>> ', response[0].Key)

	// .then(
	//     (response) => {
	//         {
	//             name: `${response[0].Key}-${response[0].Modified}`,
	//             days: response[0].NumberValue,
	//         }
	//     }
	// )

	return Promise.resolve({
		name: `${response[0].Key}-${response[0].Modified}`,
		days: response[0].NumberValue,
	})
}
