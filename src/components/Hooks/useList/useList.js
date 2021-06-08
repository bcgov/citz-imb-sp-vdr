import { DocumentUpload, AskQuestion } from 'components/SharePoint'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import {
  useColumnOrder,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import { getList } from './getList/getList'
import { useColumns } from './useColumns/useColumns'
import { useListMutations } from './useListMutations/useListMutations'

const libraryTemplate = 101

export const useList = (listName, options = {}) => {
  const {
    preRequisite,
    allowDelete,
    deleteCallback,
    allowUpload = false,
    uploadCallback,
    uploadText = 'Upload',
    customColumns,
    initialState = {},
    additionalTableActions = [],
  } = options

  if (listName === undefined)
    throw new Error('listName is undefined in useList')

  const queryOptions = useMemo(() => {
    if (preRequisite)
      return {
        enabled: !!listName && !!preRequisite,
      }

    return {
      enabled: !!listName,
    }
  }, [listName, preRequisite])

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery(
    listName,
    () => getList(listName),
    queryOptions
  )

  const { items } = useMemo(() => {
    if (isLoading || isError) return { list: {}, items: [] }
    return data
  }, [isLoading, isError, data])

  const columns = useColumns(listName, {
    allowDelete,
    deleteCallback,
    customColumns,
  })

  const { add, remove, update } = useListMutations(listName, { deleteCallback })

  const tableActions = useMemo(() => {
    if (isLoading || isError) return []

    if (allowUpload) {
      if (data.list.BaseTemplate === libraryTemplate) {
        return [
          <DocumentUpload
            listName={listName}
            addDocuments={add}
            uploadCallback={uploadCallback}>
            {uploadText}
          </DocumentUpload>,
          ...additionalTableActions,
        ]
      } else {
        return [<AskQuestion listName={listName} />, ...additionalTableActions]
      }
    }

    return [...additionalTableActions]
  }, [
    add,
    additionalTableActions,
    allowUpload,
    data,
    isError,
    isLoading,
    listName,
    uploadCallback,
    uploadText,
  ])

  const table = useTable(
    {
      columns,
      data: items,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination,
    useColumnOrder
  )

  return {
    items,
    isFetching,
    isLoading,
    isError,
    error,
    columns,
    table: { ...table, tableActions },
    add,
    remove,
    update,
    refetch,
  }
}
