import $ from 'jquery'

// Change the display name and title of the list item.
export function updateListItem(itemMetadata, hostWebUrl, newName) {
	// Construct the endpoint.
	// Specify the host web as the context site.
	var listItemUri = itemMetadata.uri.replace(
		'_api/Web',
		'_api/sp.appcontextsite(@target)/web'
	)
	var listItemEndpoint = String.format(
		listItemUri + "?@target='{0}'",
		hostWebUrl
	)

	// Define the list item changes. Use the FileLeafRef property to change the display name.
	// For simplicity, also use the name as the title.
	// The example gets the list item type from the item's metadata, but you can also get it from the
	// ListItemEntityTypeFullName property of the list.
	var body = String.format(
		"{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}'}}",
		itemMetadata.type,
		newName,
		newName
	)

	// Send the request and return the promise.
	// This call does not return response content from the server.
	return $.ajax({
		url: listItemEndpoint,
		type: 'POST',
		data: body,
		headers: {
			'X-RequestDigest': $('#__REQUESTDIGEST').val(),
			'content-type': 'application/json;odata=verbose',
			'content-length': body.length,
			'IF-MATCH': itemMetadata.etag,
			'X-HTTP-Method': 'MERGE',
		},
	})
}
