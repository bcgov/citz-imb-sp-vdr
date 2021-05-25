import { useList } from 'components/Hooks'

export const useConfig = () => {
  const listName = 'Config'

  return useList(listName)

  //   console.log('config :>> ', config)
  //   return config
  //   const columnsX = useMemo(() => {
  //     if (isLoading || isError) return []

  //     return [
  //       {
  //         Footer: 'Edit',
  //         Header: 'Edit',
  //         Cell: ({ row }) => <EditItem row={row} updateItem={update} />,
  //       },
  //       ...columns.filter(
  //         (column) => column.Header === 'Title' || column.Header === 'Key'
  //       ),
  //     ]
  //   }, [])
}
