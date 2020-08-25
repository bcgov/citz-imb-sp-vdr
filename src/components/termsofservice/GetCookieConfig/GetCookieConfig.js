import { GetCurrentUser } from 'citz-imb-sp-utilities'

import { GetTOSConfig } from 'Components'

export const GetTOSCookieConfig = async () => {
	const TOSConfig = await GetTOSConfig()
	const currentUser = await GetCurrentUser({})

	const cookieConfig = {
		name: `${TOSConfig[0].Key}-${currentUser.UserId.NameId}-${TOSConfig[0].Modified}`,
		days: TOSConfig[0].NumberValue,
	}

	return cookieConfig
}
