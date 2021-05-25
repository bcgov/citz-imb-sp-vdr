import { Alert, AlertTitle } from '@material-ui/lab'
import { useList } from 'components/Hooks'
import React from 'react'
import { SPTable } from '../SPTable/SPTable'

export const SPList = (props) => {
  const { listName, allowDelete, deleteCallback, allowUpload, uploadCallback } =
    props

  const { table, isLoading, isError, error, isFetching } = useList(listName, {
    allowDelete,
    deleteCallback,
    allowUpload,
    uploadCallback,
  })

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
      title={listName}
      isFetching={isLoading || isFetching}
    />
  )
}
