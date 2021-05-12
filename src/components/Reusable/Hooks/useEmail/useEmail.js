import { useCallback, useMemo } from 'react'
import { useConfig, useCurrentUser, useProponents } from 'components/Reusable'
import { GetGroupMembers } from 'components/ApiCalls'
import { formatText } from './formatText'

export const useEmail = () => {
  const config = useConfig()
  const currentUser = useCurrentUser()
  const proponents = useProponents()

  const contactEmail = useMemo(
    () => config.items.filter((item) => item.Key === 'contactEmail')[0],
    [config.items]
  )

  const sendEmailToCurrentProponentMembers = useCallback(async (props) => {
    console.log('sendEmailToCurrentProponentMembers props :>> ', props)
  }, [])

  const sendEmailToAllProponentMembers = useCallback(
    async ({ subject, body }) => {
      console.log('sendEmailToAllProponentMembers props :>> ', {
        subject,
        body,
      })
      console.log('proponents :>> ', proponents)

      subject = formatText(subject, {
        proponent: 'proponent',
        contactEmail,
        additionalReplacementPairs: [
          {
            searchvalue: /\[UserName\]/g,
            newvalue: currentUser.name,
          },
        ],
      })
      body = formatText(body, {
        proponent: 'proponent',
        contactEmail,
        additionalReplacementPairs: [
          {
            searchvalue: /\[UserName\]/g,
            newvalue: currentUser.name,
          },
        ],
      })

      for (let i = 0; i < proponents.items.length; i++) {
        console.log(proponents.items[i].GroupId)
        const groupMembers = await GetGroupMembers({
          groupId: proponents.items[i].GroupId,
        })
        if (groupMembers.length) {
          try {
            console.log('send email props: ', {
              to: 'addresses',
              subject,
              body,
              bcc: ['scott.toews@gov.bc.ca'],
            })
            // await SendEmail({
            //     to: 'addresses',
            //     subject,
            //     body,
            //     bcc: ['scott.toews@gov.bc.ca'],
            // });
          } catch (err) {
            console.error('err :>> ', err)
          }
          // await SendConfirmationEmail({
          //   addresses: groupMembers.map((member) => member.LoginName),
          //  ,
          //   subject,
          //   body,
          //   contactEmail,
          // })
        }
      }
    },
    [contactEmail, currentUser.name, proponents]
  )

  return {
    sendEmailToAllProponentMembers,
    sendEmailToCurrentProponentMembers,
  }
}
