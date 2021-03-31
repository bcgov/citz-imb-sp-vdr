import { RestCall } from 'components/ApiCalls/RestCall/RestCall'
import { useEffect, useState } from 'react'

export const usePeoplePicker = (props = {}) => {
	const [searchResults, setSearchResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const {
		AllowEmailAddresses = true,
		AllowMultipleEntities = false,
		AllUrlZones = false,
		MaximumEntitySuggestions = 50,
		PrincipalSource = 15,
		PrincipalType = 15,
	} = props

	const reset = () => {
		setSearchResults([])
	}

	const onChange = async (event) => {
		if (event.currentTarget.value.length > 2) {
			setIsLoading(true)
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
						AllowEmailAddresses,
						AllowMultipleEntities,
						AllUrlZones,
						MaximumEntitySuggestions,
						PrincipalSource,
						PrincipalType,
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

	useEffect(() => {
		setIsLoading(false)
		return () => {}
	}, [searchResults])

	return { onChange, searchResults, reset, isLoading }
}
