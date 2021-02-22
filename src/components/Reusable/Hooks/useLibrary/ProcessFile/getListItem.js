import $ from 'jquery'

// Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
export function getListItem(fileListItemUri, hostWebUrl, appWebUrl) {
	// Construct the endpoint.
	// The list item URI uses the host web, but the cross-domain call is sent to the
	// app web and specifies the host web as the context site.
	fileListItemUri = fileListItemUri.replace(hostWebUrl, '{0}')
	fileListItemUri = fileListItemUri.replace(
		'_api/Web',
		'_api/sp.appcontextsite(@target)/web'
	)

	var listItemAllFieldsEndpoint = String.format(
		fileListItemUri + "?@target='{1}'",
		appWebUrl,
		hostWebUrl
	)

	// Send the request and return the response.
	return $.ajax({
		url: listItemAllFieldsEndpoint,
		type: 'GET',
		headers: { accept: 'application/json;odata=verbose' },
	})
}
