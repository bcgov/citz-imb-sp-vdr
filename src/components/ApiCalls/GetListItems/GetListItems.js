import { RestCall } from '../RestCall/RestCall';

export const GetListItems = async ({
	listName,
	expand,
	filter,
	select,
	sort = '',
	sortDir = 'Asc',
	itemId,
}) => {
	let endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;

	let endPointParameters = [];

	if (itemId) {
		endPoint = `${endPoint}(${itemId})`;
	} else {
		endPointParameters.push('$top=5000');
	}

	if (expand) endPointParameters.push(`$expand=${expand}`);
	if (filter) endPointParameters.push(`$filter=${filter}`);
	if (select) endPointParameters.push(`$select=${select}`);
	if (sort) endPointParameters.push(`$sortfield=${sort}&sortdir=${sortDir}`);

	if (endPointParameters.length)
		endPoint += `?${endPointParameters.join('&')}`;

	try {
		const response = await RestCall({ endPoint: endPoint });

		if (!response.d.results) return response.d;

		return response.d.results;
	} catch (error) {
		console.error('GetListItems error :>> ', {
			listName,
			expand,
			filter,
			select,
			sort,
			sortDir,
			endPoint,
			endPointParameters,
			error,
		});
	}
};
