import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { deleteColumn } from './customColumns/deleteColumn'
import { getViewColumns } from './getColumns/getViewColumns'
import { useListMutations } from '../useListMutations/useListMutations'

export const useColumns = (listName, options) => {
  const { allowDelete = false, deleteCallback, customColumns = [] } = options

  const { remove } = useListMutations(listName, { deleteCallback })

  const queryClient = useQueryClient()

  const { status, data } = queryClient.getQueryState(listName)

  const columns = useMemo(() => {
    if (status !== 'success') return []

    const viewColumns = getViewColumns(data?.list)
    const additionalColumns = []

    if (allowDelete) additionalColumns.push(deleteColumn(remove))

    const modifiedColumns = []

    for (let i = 0; i < viewColumns.length; i++) {
      const element = customColumns.filter(
        (column) => column.accessor === viewColumns[i].accessor
      )[0]

      if (element) {
        modifiedColumns.push(element)
      } else {
        modifiedColumns.push(viewColumns[i])
      }
    }

    return [...additionalColumns, ...modifiedColumns]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return columns
}
