import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { GetFile } from 'components/Api';
import React, { useCallback } from 'react';

export const DownloadSelected = (props) => {
  const { children, selectedRows } = props


  const downloadDocuments = useCallback(
    async () => {
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        const file = await GetFile(row.original.File.ServerRelativeUrl)

        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(file)
        anchor.download = row.original.File.Name
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
      }
    },
    [selectedRows],
  )

  return (
    <>
      <Button
        color={'secondary'}
        onClick={downloadDocuments}
        endIcon={<GetAppIcon />}>
        {children}
      </Button>
    </>
  )
}
