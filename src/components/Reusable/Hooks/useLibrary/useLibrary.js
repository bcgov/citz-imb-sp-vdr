import { useQuery, useMutation, useQueryClient } from 'react-query';
import { GetLibrary, GetDocuments } from './Api';
import { addFileToFolder } from './ProcessFile/addFileToFolder';
import { getFileBuffer } from './ProcessFile/getFileBuffer';
import { RemoveItemsFromList } from 'components/ApiCalls';

export const useLibrary = (listName, options = {}) => {
	const listQueryName = [listName, 'list'];
	const itemsQueryName = [listName, 'items'];

	const library = useQuery(listQueryName, () =>
		GetLibrary({ listName, options })
	);
	const documents = useQuery(itemsQueryName, () => GetDocuments(listName));

	const queryClient = useQueryClient();

	const addDocumentMutation = useMutation(
		(payload) => addFileToFolder({ listName, payload }),
		{
			onMutate: (values) => {
				const previousValues = queryClient.getQueryData(itemsQueryName);

				queryClient.setQueryData(itemsQueryName, (oldValues) => [
					...oldValues,
					{
						id: 'temp',
						...values,
					},
				]);

				return () =>
					queryClient.setQueryData(itemsQueryName, previousValues);
			},
			onError: (error, values, previousValues) =>
				queryClient.setQueryData(itemsQueryName, previousValues),
			onSuccess: () => queryClient.refetchQueries(itemsQueryName),
		}
	);

	const addDocuments = async (fileInput) => {
		console.log('fileInput :>> ', fileInput);

		for (let i = 0; i < fileInput.length; i++) {
			var arrayBuffer = await getFileBuffer(fileInput[i]);

			await addDocumentMutation.mutateAsync({
				fileData: fileInput[i],
				fileContents: arrayBuffer,
			});
		}
	};

	const deleteDocumentMutation = useMutation(
		(itemId) => RemoveItemsFromList({ listName, itemIds: itemId }),
		{
			onMutate: (id) => {
				const previousValues = queryClient.getQueryData(itemsQueryName);

				queryClient.setQueryData(itemsQueryName, (oldValues) => {
					console.log('oldValues :>> ', oldValues);
					console.log('id :>> ', id);
					return oldValues.filter((value) => value.Id !== id);
				});

				return () =>
					queryClient.setQueryData(itemsQueryName, previousValues);
			},
			onError: (error, id, previousValues) =>
				queryClient.setQueryData(itemsQueryName, previousValues),
			onSuccess: () => queryClient.refetchQueries(itemsQueryName),
		}
	);

	const deleteDocument = async (id) => {
		console.log('deleting...', id);
		await deleteDocumentMutation.mutateAsync(id);
	};

	return {
		items: documents.data,
		list: library.data,
		isLoading: documents.isLoading
			? true
			: library.isLoading
			? true
			: false,
		isError: documents.isError ? true : library.isError ? true : false,
		isMutating: addDocumentMutation.isLoading ? true : false,
		error: `documents: ${documents.error} | library: ${library.error}`,
		addDocuments,
		deleteDocument,
	};
};
