import { Alert, AlertTitle } from '@material-ui/lab'
import { useList } from 'components/Hooks'
import React from 'react'
import { SPTable } from '../SPTable/SPTable'

export const SPList = (props) => {
  const { listName, showTitle, columnFiltering, title, noRecordsText, ...listProps } = props

  const { table, isLoading, isError, error, isFetching } = useList(
    listName,
    listProps
  )

  if (isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }

  return (
    <SPTable
      table={table}
      title={title ?? listName}
      showTitle={showTitle}
      isFetching={isLoading || isFetching}
      columnFiltering={columnFiltering}
      noRecordsText={noRecordsText}
    />
  )
}
