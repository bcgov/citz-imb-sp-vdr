import { useMemo } from 'react';
import {
	AddItemsToList,
	UpdateListItem,
	AddFileToFolder,
	RemoveDocumentFromLibrary,
	GetFileBuffer,
} from 'components/ApiCalls';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { getList } from './getList/getList';
import { getColumns } from './getColumns/getColumns';

export const useList = (props) => {
	const { listName, preRequisite, isLibrary = false, options = {} } = props;

	// const listQueryName = [listName, 'list']
	// const itemsQueryName = [listName, 'items']

	let queryOptions = {
		...options,
		enabled: !!listName,
	};

	if (preRequisite) {
		queryOptions = {
			...queryOptions,
			enabled: !!listName && !!preRequisite,
		};
	}

	let listOptions = {};

	if (isLibrary) {
		listOptions.expand = 'File';
	}

	const mylist = useQuery(
		listName,
		() => getList(listName, listOptions),
		queryOptions
	);
	// console.log('mylist :>> ', mylist)

	const { data, isFetching, isLoading, isError, status, error } = mylist;

	const { list, items } = useMemo(() => {
		if (isLoading || isError) return { list: {}, items: [] };
		return data;
	}, [isLoading, isError, data]);

	// const items = useQuery(itemsQueryName, () => GetListItems(listName))

	const queryClient = useQueryClient();

	const columns = useMemo(() => {
		if (isLoading || isError) return [];
		// console.log('----------------------------');
		// console.log('listName :>> ', listName);
		// console.log('list :>> ', list);
		return getColumns(list);
	}, [isLoading, isError, list]);

	//================Mutations======================

	const addItemMutation = useMutation(
		(newItem) =>
			AddItemsToList({
				listName,
				items: newItem,
			}),
		{
			onMutate: async (newItem) => {
				await queryClient.cancelQueries(listName);

				const previousValues = queryClient.getQueryData(listName);

				queryClient.setQueryData(listName, (oldValues) => {
					let newValues = [...oldValues.items];

					newValues.push(newItem);
					return { list: oldValues.list, items: newValues };
				});

				return { previousValues };
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(listName, context.previousValues),
			onSettled: async () =>
				await queryClient.invalidateQueries(listName),
		}
	);

	const updateItemMutation = useMutation(
		(updateItem) => UpdateListItem({ listName, items: updateItem }),
		{
			onMutate: async (updateItem) => {
				const previousValues = queryClient.getQueryData(listName);

				queryClient.setQueryData(listName, (oldValues) => {
					let newValues = [...oldValues.items];

					const itemIndex = newValues.findIndex(
						(item) => item.Id === updateItem.Id
					);

					newValues[itemIndex] = {
						...newValues[itemIndex],
						...updateItem,
					};

					return { list: oldValues.list, items: newValues };
				});

				return { previousValues };
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(listName, context.previousValues),
			onSettled: async () =>
				await queryClient.invalidateQueries(listName),
		}
	);

	const addDocumentMutation = useMutation(
		(payload) => AddFileToFolder({ listName, payload }),
		{
			onMutate: async (newValue) => {
				await queryClient.cancelQueries(listName);

				const previousValues = queryClient.getQueryData(listName);

				queryClient.setQueryData(listName, (oldValues) => {
					return {
						...oldValues,
						items: [
							...oldValues.items,
							{
								id: 'temp',
								File: {
									Name: newValue.fileData.name,
								},
								...newValue,
							},
						],
					};
				});

				return { previousValues };
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(listName, context.previousValues),
			onSettled: async () =>
				await queryClient.invalidateQueries(listName),
		}
	);

	const deleteDocumentMutation = useMutation(
		async (itemId) =>
			await RemoveDocumentFromLibrary({ listName, itemIds: itemId }),
		{
			onMutate: async (id) => {
				await queryClient.cancelQueries(listName);

				const previousValues = queryClient.getQueryData(listName);

				queryClient.setQueryData(listName, (oldValues) => {
					return {
						...oldValues,
						items: oldValues.items.filter(
							(value) => value.Id !== id
						),
					};
				});

				return { previousValues };
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(listName, context.previousValues),
			// onSettled: async () => {
			// 	await queryClient.invalidateQueries(listName);
			// },
		}
	);

	let mutations = {};

	if (isLibrary) {
		mutations = {
			addDocuments: async (fileInput) => {
				for (let i = 0; i < fileInput.length; i++) {
					var arrayBuffer = await GetFileBuffer(fileInput[i]);

					await addDocumentMutation.mutateAsync({
						fileData: fileInput[i],
						fileContents: arrayBuffer,
					});
				}
			},
			deleteDocument: async (id) =>
				await deleteDocumentMutation.mutateAsync(id),
			isMutating: addDocumentMutation.isLoading
				? true
				: deleteDocumentMutation
				? true
				: false,
		};
	} else {
		mutations = {
			isMutating: addItemMutation.isLoading
				? true
				: updateItemMutation.isLoading
				? true
				: false,
			addItem: addItemMutation.mutateAsync,
			updateItem: updateItemMutation.mutateAsync,
		};
	}

	return {
		list,
		items,
		isFetching,
		isLoading,
		isError,
		error,
		status,
		columns,
		...mutations,
	};
};
