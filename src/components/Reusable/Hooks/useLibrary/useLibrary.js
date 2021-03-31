import { useQuery, useMutation, useQueryClient } from 'react-query';
import { GetLibrary, GetDocuments } from './Api';
import { addFileToFolder } from './ProcessFile/addFileToFolder';
import { getFileBuffer } from './ProcessFile/getFileBuffer';
import { RemoveDocumentFromLibrary } from 'components/ApiCalls';

export const useLibrary = (listName, options = {}) => {
	const listQueryName = [listName, 'list'];
	const itemsQueryName = [listName, 'items'];

	const library = useQuery(listQueryName, () =>
		GetLibrary({ listName, options })
	);
	const documents = useQuery(itemsQueryName, () => GetDocuments(listName));

	const queryClient = useQueryClient();

	const refresh = async () =>
		await queryClient.invalidateQueries(itemsQueryName);

	const addDocumentMutation = useMutation(
		(payload) => addFileToFolder({ listName, payload }),
		{
			onMutate: async (newValue) => {
				await queryClient.cancelQueries(itemsQueryName);

				const previousValues = queryClient.getQueryData(itemsQueryName);

				queryClient.setQueryData(itemsQueryName, (oldValues) => [
					...oldValues,
					{
						id: 'temp',
						File: {
							Name: newValue.fileData.name,
						},
						...newValue,
					},
				]);

				return { previousValues, newValue };
			},
			onError: (error, newValue, context) =>
				queryClient.setQueryData(
					itemsQueryName,
					context.previousValues
				),
			onSettled: refresh,
		}
	);

	const addDocuments = async (fileInput) => {
		for (let i = 0; i < fileInput.length; i++) {
			var arrayBuffer = await getFileBuffer(fileInput[i]);

			await addDocumentMutation.mutateAsync({
				fileData: fileInput[i],
				fileContents: arrayBuffer,
			});
		}
	};

	const deleteDocumentMutation = useMutation(
		(itemId) => RemoveDocumentFromLibrary({ listName, itemIds: itemId }),
		{
			onMutate: async (id) => {
				await queryClient.cancelQueries(itemsQueryName);

				const previousValues = queryClient.getQueryData(itemsQueryName);

				queryClient.setQueryData(itemsQueryName, (oldValues) =>
					oldValues.filter((value) => value.Id !== id)
				);

				return { previousValues };
			},
			onError: (error, id, context) => {
				queryClient.setQueryData(
					itemsQueryName,
					context.previousValues
				);
			},
			onSettled: refresh,
		}
	);

	const deleteDocument = async (id) =>
		await deleteDocumentMutation.mutateAsync(id);

	return {
		items: documents.data,
		list: library.data,
		isLoading: documents.isLoading
			? true
			: library.isLoading
			? true
			: false,
		isError: documents.isError ? true : library.isError ? true : false,
		isMutating: addDocumentMutation.isLoading
			? true
			: deleteDocumentMutation
			? true
			: false,
		error: `documents: ${documents.error} | library: ${library.error}`,
		addDocuments,
		deleteDocument,
	};
};
