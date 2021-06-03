import { RemoveMember } from './RemoveMember'

export const removeMemberColumn = (removeMember) => {
  return {
    Header: 'Remove',
    Footer: 'Remove',
    id: 'Remove',
    Cell: ({ row }) => {
      return (
        <RemoveMember removeMember={removeMember} userId={row.original.Id} userName={row.original.Title} />
      )
    },
    disableFilters: true,
    disableSortBy: true,
  }
}
