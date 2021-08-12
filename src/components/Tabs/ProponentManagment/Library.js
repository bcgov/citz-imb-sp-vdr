import { SPList } from 'components/SharePoint'
import { useMemo } from 'react'

export const Library = (props) => {
  const { UUID } = props

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'Modified', desc: true }] }
  }, [])

  return <SPList listName={UUID} columnFiltering={true} initialState={initialState} downloadSelected={true} />
}
