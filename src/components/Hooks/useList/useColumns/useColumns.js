import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { deleteColumn } from './customColumns/deleteColumn'
import { getViewColumns } from './getColumns/getViewColumns'
import { useMutations } from '../useMutations/useMutations'

export const useColumns = (listName, options) => {
  const { allowDelete = false, deleteCallback } = options

  const { remove } = useMutations(listName, { deleteCallback })

  const queryClient = useQueryClient()

  const { status, data } = queryClient.getQueryState(listName)

  const columns = useMemo(() => {
    if (status !== 'success') return []

    const viewColumns = getViewColumns(data.list)
    const additionalColumns = []

    if (allowDelete) additionalColumns.push(deleteColumn(remove))

    return [...additionalColumns, ...viewColumns]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowDelete, data?.list, status])

  return columns
}
