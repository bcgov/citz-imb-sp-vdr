import { useEmail, useLogAction } from 'components/Hooks'
import { SPGroup } from 'components/SharePoint'
import React, { useCallback } from 'react'

export const Membership = (props) => {
  const { GroupId, Title } = props

  const { sendEmailToSiteContact, sendEmailToNewMember } = useEmail()
  const logAction = useLogAction()

  const addMemberCallback = useCallback(async (data, variables, context) => {
    const members = variables.members.map((member) => member.DisplayText)

    logAction(`added ${members.join('; ')} to ${Title} group`)
    await variables.members.map(async (member) => {
      logAction(await sendEmailToNewMember('addUserEmail', member))
    })
  }, [])

  const removeMemberCallback = useCallback(async (data, variables, context) => {
    logAction(await sendEmailToSiteContact('removeUserEmail'))
  }, [])

  return (
    <SPGroup
      groupId={GroupId}
      proponentName={Title}
      addMemberCallback={addMemberCallback}
      removeMemberCallback={removeMemberCallback}
      allowRemoveMember={true}
      allowAddMember={true}
    />
  )
}
