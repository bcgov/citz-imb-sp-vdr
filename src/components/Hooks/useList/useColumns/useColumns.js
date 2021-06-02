import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { deleteColumn } from './customColumns/deleteColumn'
import { getViewColumns } from './getColumns/getViewColumns'
import { useListMutations } from '../useListMutations/useListMutations'

export const useColumns = (listName, options) => {
  const { allowDelete = false, deleteCallback } = options

  const { remove } = useListMutations(listName, { deleteCallback })

  const queryClient = useQueryClient()

  const { status, data } = queryClient.getQueryState(listName)

  const columns = useMemo(() => {
    if (status !== 'success') return []

    const viewColumns = getViewColumns(data?.list)
    const additionalColumns = []

    if (allowDelete) additionalColumns.push(deleteColumn(remove))

    return [...additionalColumns, ...viewColumns]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowDelete, data, status])

  return columns
}
