import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { SPList } from 'components/SharePoint'
import React from 'react'
import { Assignee } from './Assignee'

export const Questions = (props) => {
  const { UUID } = props
  const listName = `${UUID}_Questions`

  const customColumns = [
    {
      Filter: SelectColumnFilter,
      accessor: 'AnswerStatus',
      Header: 'Status / Answer',
      Cell: ({ value, row }) => {
        return <AnswerCell row={row} value={value} listName={listName}/>
      },
    },
    {
      Filter: SelectColumnFilter,
      accessor: 'Assignee',
      Cell: ({ value, row }) => {
        return <Assignee row={row} value={value} listName={listName} />
      },
    },
  ]

  return (
    <SPList
      listName={listName}
      customColumns={customColumns}
      showTitle={true}
      columnFiltering={true}
    />
  )
}
