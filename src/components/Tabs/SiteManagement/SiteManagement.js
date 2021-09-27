import { SPList } from 'components/SharePoint'
import { ActivityLog } from './ActivityLog/ActivityLog'
import { EditItem } from './EditItem/EditItem'

export const SiteManagement = () => {
  const initialState = {
    hiddenColumns: [
      'GroupValueId',
      'MultiTextValue',
      'NumberValue',
      'TextValue',
      'YesNoValue',
      'Instructions',
    ],
    columnOrder: ["Edit"]
  }
  const customColumns = [
    {
      Header: 'Edit',
      Footer: 'Edit',
      accessor: 'Edit',
      id: 'Edit',
      Cell: ({ row }) => <EditItem {...row} />,
    },
  ]

  const additionalTableActions = [<ActivityLog />]

  return (
    <SPList
      listName={'config'}
      initialState={initialState}
      customColumns={customColumns}
      showTitle={false}
      additionalTableActions={additionalTableActions}
    />
  )
}
