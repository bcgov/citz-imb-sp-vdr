import { DeleteFile } from './DeleteFile'

export const deleteColumn = (remove) => {
  return {
    Header: 'Delete',
    Footer: 'Delete',
    id: 'Delete',
    Cell: ({ row }) => {
      return (
        <DeleteFile
          deleteFile={() => remove(row.original.Id)}
          fileName={row.original.File?.Name}
        />
      )
    },
    disableFilters: true,
    disableSortBy: true,
  }
}
