import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { getList } from './getList/getList'
import { useColumns } from './useColumns/useColumns'
import { useMutations } from './useMutations/useMutations'
import { DocumentUpload } from 'components/SharePoint'

export const useList = (listName, options = {}) => {
  const {
    preRequisite,
    allowDelete,
    deleteCallback,
    allowUpload = false,
    ...otherOptions
  } = options
  const [queryOptions, setQueryOptions] = useState({
    ...otherOptions,
    enabled: !!listName,
  })

  const [tableActions, setTableActions] = useState([])

  useEffect(() => {
    if (preRequisite) {
      setQueryOptions((prevState) => {
        return {
          ...prevState,
          enabled: !!listName && !!preRequisite,
        }
      })
    }
    return () => {}
  }, [listName, preRequisite])

  useEffect(() => {
    if (allowUpload)
      setTableActions((prevState) => [...prevState, <DocumentUpload />])
    return () => {}
  }, [allowUpload])

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

  const table = useTable(
    {
      columns,
      data: items,
      // initialState
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const { add, remove, update } = useMutations(listName, { deleteCallback })

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
