import { GroupTable } from 'components'
import React from 'react'

export const Membership = ({ GroupId, Title }) => {
  return <GroupTable groupId={GroupId} proponentName={Title} />
}
