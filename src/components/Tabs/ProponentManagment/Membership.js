import { useConfig, useLogAction } from 'components/Hooks'
import { SendConfirmationEmail } from 'components/Reusable'
import { SPGroup } from 'components/SharePoint'
import React, { useCallback } from 'react'

export const Membership = (props) => {
  const { GroupId, Title } = props

  const logAction = useLogAction()
  const config = useConfig()

  const addMemberCallback = useCallback(
    async (data, variables, context) => {
      const members = variables.members.map((member) => member.DisplayText)
      const addUserEmail = config.items.filter(
        (item) => item.Key === 'addUserEmail'
      )[0]
      const contactEmail = config.items.filter(
        (item) => item.Key === 'contactEmail'
      )[0]
      logAction(`added ${members.join('; ')} to ${Title} group`)
      await variables.members.map(async (member) => {
        await SendConfirmationEmail({
          addresses: member.Key,
          proponent: Title,
          subject: addUserEmail.TextValue,
          body: addUserEmail.MultiTextValue,
          additionalReplacementPairs: [
            {
              searchvalue: /\[AddresseeName\]/g,
              newvalue: member.DisplayText,
            },
          ],
          contactEmail,
        })
        logAction(`sent ${addUserEmail.Title} to ${members.join('; ')}`)
      })
    },
    [Title, config.items, logAction]
  )

  const removeMemberCallback = useCallback(
    async (data, variables, context) => {
      const removedUserName = context.previousValues.members.filter(
        (member) => member.Id === variables
      )[0].Title

      const removeUserEmail = config.items.filter(
        (item) => item.Key === 'removeUserEmail'
      )[0]

      const contactEmail = config.items.filter(
        (item) => item.Key === 'contactEmail'
      )[0]

      await SendConfirmationEmail({
        addresses: contactEmail.TextValue,
        proponent: Title,
        subject: removeUserEmail.TextValue,
        body: removeUserEmail.MultiTextValue,
        additionalReplacementPairs: [
          {
            searchvalue: /\[UserName\]/g,
            newvalue: removedUserName,
          },
        ],
        contactEmail,
      })
      logAction(`sent ${removeUserEmail.Title} to ${contactEmail.TextValue}`)
    },
    [Title, config.items, logAction]
  )

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
