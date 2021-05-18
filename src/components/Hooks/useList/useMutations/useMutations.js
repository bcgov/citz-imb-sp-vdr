import {
  AddFileToFolder,
  AddItemsToList,
  GetFileBuffer,
  RemoveDocumentFromLibrary,
  UpdateListItem,
} from 'components/Api'
import { useCurrentUser } from 'components/Hooks'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const useMutations = (listName, options) => {
  const { deleteCallback = () => {} } = options
  const currentUser = useCurrentUser()

  const queryClient = useQueryClient()

  const { status, data } = queryClient.getQueryState(listName)

  const addItemMutation = useMutation(
    (newItem) =>
      AddItemsToList({
        listName,
        items: newItem,
      }),
    {
      onMutate: async (newItem) => {
        await queryClient.cancelQueries(listName)

        const previousValues = queryClient.getQueryData(listName)

        queryClient.setQueryData(listName, (oldValues) => {
          let newValues = [...oldValues.items]

          newValues.push(newItem)
          return { list: oldValues.list, items: newValues }
        })

        return { previousValues }
      },
      onError: (error, newItem, context) =>
        queryClient.setQueryData(listName, context.previousValues),
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  )

  const updateItemMutation = useMutation(
    (updateItem) => UpdateListItem({ listName, items: updateItem }),
    {
      onMutate: async (updateItem) => {
        const previousValues = queryClient.getQueryData(listName)

        queryClient.setQueryData(listName, (oldValues) => {
          let newValues = [...oldValues.items]

          const itemIndex = newValues.findIndex(
            (item) => item.Id === updateItem.Id
          )

          newValues[itemIndex] = {
            ...newValues[itemIndex],
            ...updateItem,
          }

          return { list: oldValues.list, items: newValues }
        })

        return { previousValues }
      },
      onError: (error, newItem, context) =>
        queryClient.setQueryData(listName, context.previousValues),
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  )

  const addDocumentMutation = useMutation(
    (payload) => AddFileToFolder({ listName, payload }),
    {
      onMutate: async (newValue) => {
        await queryClient.cancelQueries(listName)

        const previousValues = queryClient.getQueryData(listName)

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
                EditorId: currentUser.id,
                ...newValue,
              },
            ],
          }
        })

        return { previousValues }
      },
      onError: (error, newItem, context) =>
        queryClient.setQueryData(listName, context.previousValues),
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  )

  const deleteDocumentMutation = useMutation(
    async (itemId) =>
      await RemoveDocumentFromLibrary({ listName, itemIds: itemId }),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(listName)

        const previousValues = queryClient.getQueryData(listName)

        queryClient.setQueryData(listName, (oldValues) => {
          return {
            ...oldValues,
            items: oldValues.items.filter((value) => value.Id !== id),
          }
        })

        return { previousValues }
      },
      onError: async (err, variables, context) => {
        console.log('{err, variables, context} :>> ', {
          err,
          variables,
          context,
        })
        deleteCallback(false,  context.previousValues.items.filter(
          (item) => item.Id === variables
        )[0].File.Name)
        return queryClient.setQueryData(listName, context.previousValues)
      },
      onSuccess: (data, variables, context) => {
        deleteCallback(
          true,
          context.previousValues.items.filter(
            (item) => item.Id === variables
          )[0].File.Name
        )
      },
    }
  )

  const add = useCallback(() => {
    if (status !== 'success') return () => {}
    if (data.list.BaseTemplate === 101)
      return async (fileInput) => {
        for (let i = 0; i < fileInput.length; i++) {
          var arrayBuffer = await GetFileBuffer(fileInput[i])

          await addDocumentMutation.mutateAsync({
            fileData: fileInput[i],
            fileContents: arrayBuffer,
          })
        }
      }
    return addItemMutation.mutateAsync
  }, [
    addDocumentMutation,
    addItemMutation.mutateAsync,
    data?.list?.BaseTemplate,
    status,
  ])

  const remove = useCallback(
    (id) => {
      if (status !== 'success') return () => {}
      if (data.list.BaseTemplate === 101)
        return deleteDocumentMutation.mutateAsync(id)
      return (id) => {
        console.warn('not implemented')
      }
    },
    [data?.list?.BaseTemplate, deleteDocumentMutation, status]
  )
  return { add, remove, update: updateItemMutation.mutateAsync }
}
