import { SPList } from 'components/SharePoint'
import React from 'react'

export const Library = (props) => {
  const { UUID } = props

  return <SPList listName={UUID} />
}
