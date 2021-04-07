import $ from 'jquery';
import { GetFormDigestValue } from 'components/ApiCalls';
// Add the file to the file collection in the Shared Documents folder.
export async function AddFileToFolder(props) {
	const { listName, payload } = props;
	const { fileData, fileContents } = payload;
	//eslint-disable-next-line
	const appWebUrl = _spPageContextInfo.webAbsoluteUrl;
	//eslint-disable-next-line
	const hostWebUrl = _spPageContextInfo.webAbsoluteUrl;
	const digestValue = await GetFormDigestValue(hostWebUrl);

	var fileName = fileData.name;
	// Construct the endpoint.
	var fileCollectionEndpoint = String.format(
		"{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
			"/add(overwrite=true, url='{2}')",
		appWebUrl,
		listName,
		fileName
	);

	// Send the request and return the response.
	// This call returns the SharePoint file.
	return $.ajax({
		url: fileCollectionEndpoint,
		type: 'POST',
		data: fileContents,
		processData: false,
		headers: {
			accept: 'application/json;odata=verbose',
			'X-RequestDigest': digestValue,
		},
	});
}
