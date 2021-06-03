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

    const modifiedColumns = [...viewColumns]

    for (let i = 0; i < customColumns.length; i++) {
      let foundCustomColumnInViewColumns = false
      for (let j = 0; j < viewColumns.length; j++) {
        if (customColumns[i].accessor === viewColumns[j].accessor) {
          modifiedColumns[j] = customColumns[i]
          foundCustomColumnInViewColumns = true
          break
        }
      }

      if (!foundCustomColumnInViewColumns)
        modifiedColumns.push(customColumns[i])
    }

    return [...additionalColumns, ...modifiedColumns]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return columns
}
