import { useState, useEffect } from 'react'
import { RestCall } from '../../../../../node_modules/citz-imb-sp-utilities/dist/js/components/Reusable/RestCall/RestCall'

export const usePeoplePicker = () => {
	const [searchResults, setSearchResults] = useState([])

	const reset = () => {
		setSearchResults([])
	}

	const onChange = async (event) => {
		if (event.currentTarget.value.length > 2) {
			const options = {
				endPoint:
					'/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser',
				method: 'post',
				body: {
					queryParams: {
						__metadata: {
							type:
								'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters',
						},
						AllowEmailAddresses: true,
						AllowMultipleEntities: false,
						AllUrlZones: false,
						MaximumEntitySuggestions: 50,
						PrincipalSource: 15,
						PrincipalType: 15,
						QueryString: event.currentTarget.value,
						// Required: false,
						// SharePointGroupID: null,
						// UrlZone: null,
						// UrlZoneSpecified: false,
						// Web: null,
						// WebApplicationID: null,
					},
				},
				// headers:'',
				// cache:''
			}

			const results = await RestCall(options)

			setSearchResults(JSON.parse(results.d.ClientPeoplePickerSearchUser))
		}
	}

	return { onChange, searchResults, reset }
}
