import { useCallback, useMemo } from 'react'
import {
  useConfig,
  useCurrentUser,
  useLogAction,
  useProponents,
} from 'components/Reusable'
// import { GetGroupMembers } from 'components/Api'
// import { formatText } from './formatText'

export const useEmail = () => {
  const config = useConfig()
  const currentUser = useCurrentUser()
  const {
    add,
    get,
    isLoading,
    items,
    setActive,
    setInactive,
    allowSubmissions,
    toggleAllowSubmissions,
    refetch,
    allUserLoginNames,
  } = useProponents()
  const logAction = useLogAction()

  const contactEmail = useMemo(
    () => config.items.filter((item) => item.Key === 'contactEmail')[0],
    [config.items]
  )

  const sendEmailToCurrentProponentMembers = useCallback(async (props) => {
    console.log('sendEmailToCurrentProponentMembers props :>> ', props)
    return 'sendEmailToCurrentProponentMembers props :>> '
  }, [])

  const sendEmailToAllProponents = useCallback(async (props) => {
    console.log('sendEmailToAllProponents props :>> ', props)

    console.log(
      'allUserLoginNames :>> ',
      allUserLoginNames
    )
    // console.log('sendEmailToAllProponentMembers props :>> ', {
    //   subject,
    //   body,
    // })
    // console.log('proponents :>> ', proponents)

    // subject = formatText(subject, {
    //   proponent: 'proponent',
    //   contactEmail,
    //   additionalReplacementPairs: [
    //     {
    //       searchvalue: /\[UserName\]/g,
    //       newvalue: currentUser.name,
    //     },
    //   ],
    // })
    // body = formatText(body, {
    //   proponent: 'proponent',
    //   contactEmail,
    //   additionalReplacementPairs: [
    //     {
    //       searchvalue: /\[UserName\]/g,
    //       newvalue: currentUser.name,
    //     },
    //   ],
    // })

    // for (let i = 0; i < proponents.items.length; i++) {
    //   console.log(proponents.items[i].GroupId)
    //   const groupMembers = await GetGroupMembers({
    //     groupId: proponents.items[i].GroupId,
    //   })
    //   if (groupMembers.length) {
    //     try {
    //       console.log('send email props: ', {
    //         to: 'addresses',
    //         subject,
    //         body,
    //         bcc: ['scott.toews@gov.bc.ca'],
    //       })
    //       // await SendEmail({
    //       //     to: 'addresses',
    //       //     subject,
    //       //     body,
    //       //     bcc: ['scott.toews@gov.bc.ca'],
    //       // });
    //     } catch (err) {
    //       console.error('err :>> ', err)
    //     }
    //     // await SendConfirmationEmail({
    //     //   addresses: groupMembers.map((member) => member.LoginName),
    //     //  ,
    //     //   subject,
    //     //   body,
    //     //   contactEmail,
    //     // })
    //   }
    // }
    logAction(`sent '${props}' email to all proponents`, {
      snackbar: false,
    })
    return 'sendEmailToAllProponents props :>> '
  }, [])

  const sendEmailToSiteContact = useCallback((props) => {
    console.log('sendEmailToSiteContact props :>> ', props)
    return 'sendEmailToSiteContact props :>> '
  }, [])

  const sendEmailToNewMember = useCallback((props) => {
    console.log('sendEmailToSiteContact props :>> ', props)
    // SendConfirmationEmail({
    //   addresses: member.Key,
    //   proponent: Title,
    //   subject: addUserEmail.TextValue,
    //   body: addUserEmail.MultiTextValue,
    //   additionalReplacementPairs: [
    //     {
    //       searchvalue: /\[AddresseeName\]/g,
    //       newvalue: member.DisplayText,
    //     },
    //   ],
    //   contactEmail,
    // })
    return 'sendEmailToSiteContact props :>> '
  }, [])

  return {
    sendEmailToAllProponents,
    sendEmailToCurrentProponentMembers,
    sendEmailToSiteContact,
    sendEmailToNewMember,
  }
}

/*

const sendEmailToProponents = useCallback(
    async (props) => {
      const { subject, body } = props

      for (let i = 0; i < proponents.items.length; i++) {
        const groupMembers = await GetGroupMembers({
          groupId: proponents.items[i].GroupId,
        })
        if (groupMembers.length) {
          await SendConfirmationEmail({
            addresses: groupMembers.map((member) => member.LoginName),
            proponent: proponents.items[i].Title,
            subject,
            body,
            contactEmail,
            additionalReplacementPairs: [
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
            ],
          })
        }
      }
    },
    [contactEmail, currentUser, proponents]
  )


*/
