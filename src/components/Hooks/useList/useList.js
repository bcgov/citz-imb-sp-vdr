import { DocumentUpload, AskQuestion, DownloadSelected } from 'components/SharePoint'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import {
  useColumnOrder,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
  useRowSelect
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
    downloadSelected = false,
    showNotificationSwitch
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

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

  const table = useTable(
    {
      columns,
      data: items,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination,
    useColumnOrder,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        if (downloadSelected) {
          return [
            // Let's make a column for selection
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ]
        } else {
          return columns
        }

      })
    }
  )

  const tableActions = useMemo(() => {
    if (isLoading || isError) return []

    const actions = additionalTableActions

    if (downloadSelected) {
      actions.push(<DownloadSelected selectedRows={table.selectedFlatRows} >Download Selected</DownloadSelected>)
    }

    if (allowUpload) {
      if (data.list.BaseTemplate === libraryTemplate) {
        actions.push(
          <DocumentUpload
            title={`Upload to ${listName}`}
            addDocuments={add}
            uploadCallback={uploadCallback}
            showNotificationSwitch={showNotificationSwitch}>
            {uploadText}
          </DocumentUpload>)
      } else {
        actions.push(<AskQuestion listName={listName} title={`Submit a Question`} />)
      }
    }

    return actions
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
