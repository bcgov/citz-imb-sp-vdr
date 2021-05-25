import { DocumentUpload } from 'components/SharePoint'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { getList } from './getList/getList'
import { useColumns } from './useColumns/useColumns'
import { useMutations } from './useMutations/useMutations'

export const useList = (listName, options = {}) => {
  const {
    preRequisite,
    allowDelete,
    deleteCallback,
    allowUpload = false,
    uploadCallback,
  } = options

  const queryOptions = useMemo(() => {
    if (preRequisite)
      return {
        enabled: !!listName && !!preRequisite,
      }

    return {
      enabled: !!listName,
    }
  }, [listName, preRequisite])

  const { data, isFetching, isLoading, isError, error } = useQuery(
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
  })

  const { add, remove, update } = useMutations(listName, { deleteCallback })

  const tableActions = useMemo(() => {
    if (allowUpload)
      return [
        <DocumentUpload
          listName={listName}
          addDocuments={add}
          uploadCallback={uploadCallback}
        />,
      ]
    return []
  }, [add, allowUpload, listName, uploadCallback])

  const table = useTable(
    {
      columns,
      data: items,
    },
    useFilters,
    useSortBy,
    usePagination
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
  }
}
