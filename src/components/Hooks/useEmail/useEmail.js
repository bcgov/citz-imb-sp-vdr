import { GetUser, GetUserByEmail, SendEmail } from 'components/Api'
import { useConfig, useLogAction, useProponents } from 'components/Hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useEmail = () => {

  const [contactEmail, setContactEmail] = useState()
  const [contactEmailLogin, setContactEmailLogin] = useState()
  const config = useConfig()
  const { get: getProponent, allUserLoginNames } = useProponents()
  const logAction = useLogAction()

  useEffect(() => {
    getContactEmail()
  }, [])

  const getContactEmail = async () => {
    const emailAddress = config.itemFilter('contactEmail').TextValue
    setContactEmail(emailAddress)
    const user = await GetUserByEmail({ email: emailAddress })
    setContactEmailLogin(user[0].LoginName)
  }

  const replacementPairs = useMemo(() => {
    return [
      { searchvalue: /\n/g, newvalue: '<br>' },
      // eslint-disable-next-line no-undef
      { searchvalue: /\[Title\]/g, newvalue: _spPageContextInfo.webTitle },
      {
        searchvalue: /\[SiteLink\]/g,
        // eslint-disable-next-line no-undef
        newvalue: `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
      },
      {
        searchvalue: /\[ContactEmail\]/g,
        newvalue: contactEmail,
      },
    ]
  }, [contactEmail])

  const replaceText = useCallback(
    (text, options = {}) => {
      const { additionalPairValues = [] } = options
      let newText = text

      const replacements = [...replacementPairs, ...additionalPairValues]

      for (let i = 0; i < replacements.length; i++) {
        newText = newText.replace(
          replacements[i].searchvalue,
          replacements[i].newvalue
        )
      }

      return newText
    },
    [replacementPairs]
  )

  const sendEmailToCurrentProponentMembers = useCallback(
    async (type, options = {}) => {
      if (!config.itemFilter(type).YesNoValue) return

      const { currentUser } = options

      const proponentUsers = getProponent(currentUser.proponent).Users

      let emailContents = []

      switch (type) {
        case 'addQuestionEmail':
          emailContents = proponentUsers.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const additionalPairValues = [
              {
                searchvalue: /\[AddresseeName\]/g,
                newvalue: user.Title,
              },
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
              {
                searchvalue: /\[Proponent\]/g,
                newvalue: currentUser.proponent,
              },
            ]

            const newBody = replaceText(body, { additionalPairValues })

            const newSubject = replaceText(subject, { additionalPairValues })

            return [
              {
                to: user.LoginName,
                subject: newSubject,
                body: newBody,
              },
              user.Title,
            ]
          })

          break

        case 'proponentDocumentEmail':
          emailContents = proponentUsers.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const additionalPairValues = [
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
            ]

            const newBody = replaceText(body, { additionalPairValues })

            const newSubject = replaceText(subject, { additionalPairValues })

            return [
              {
                to: user.LoginName,
                subject: newSubject,
                body: newBody,
              },
              user.Title,
            ]
          })

          break

        case 'withdrawQuestionEmail':
          emailContents = proponentUsers.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const additionalPairValues = [
              {
                searchvalue: /\[AddresseeName\]/g,
                newvalue: user.Title,
              },
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
            ]

            const newBody = replaceText(body, { additionalPairValues })

            const newSubject = replaceText(subject, { additionalPairValues })

            return [
              {
                to: user.LoginName,
                subject: newSubject,
                body: newBody,
              },
              user.Title,
            ]
          })

          break

        case 'ProponentDeleteDocumentEmail':
          emailContents = proponentUsers.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const additionalPairValues = [
              {
                searchvalue: /\[AddresseeName\]/g,
                newvalue: user.Title,
              },
              {
                searchvalue: /\[UserName\]/g,
                newvalue: currentUser.name,
              },
            ]

            const newBody = replaceText(body, { additionalPairValues })

            const newSubject = replaceText(subject, { additionalPairValues })

            return [
              {
                to: user.LoginName,
                subject: newSubject,
                body: newBody,
              },
              user.Title,
            ]
          })

          break

        default:
          console.error(
            `sendEmailToCurrentProponentMembers type '${type}' is invalid`
          )
          return
      }

      try {
        for (let i = 0; i < emailContents.length; i++) {
          await SendEmail(emailContents[i][0])
          logAction(`sent ${type} to ${emailContents[i][1]}`, {
            snackbar: false,
          })
        }
      } catch (error) {
        logAction(
          `Error: sendEmailToCurrentProponentMembers - ${type} - ${error}`,
          {
            variant: 'error',
            snackbar: false,
          }
        )
      }
      return
    },
    [config.items, getProponent, logAction, replaceText]
  )

  const sendEmailToAllProponents = useCallback(
    async (type, options = {}) => {
      if (type !== 'publicDocumentEmail' && !config.itemFilter(type).YesNoValue) return

      let emailContents = []

      switch (type) {
        case 'publicDocumentEmail':
          emailContents = allUserLoginNames.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const newBody = replaceText(body)

            const newSubject = replaceText(subject)

            return {
              to: user,
              subject: newSubject,
              body: newBody,
            }
          })
          break

        case 'newAnswerEmail':
          emailContents = allUserLoginNames.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const newBody = replaceText(body)

            const newSubject = replaceText(subject)

            return {
              to: user,
              subject: newSubject,
              body: newBody,
            }
          })
          break

        case 'updatedAnswerEmail':
          emailContents = allUserLoginNames.map((user) => {
            const subject = config.itemFilter(type).TextValue
            const body = config.itemFilter(type).MultiTextValue

            const newBody = replaceText(body)

            const newSubject = replaceText(subject)

            return {
              to: user,
              subject: newSubject,
              body: newBody,
            }
          })
          break

        default:
          console.error(`sendEmailToAllProponents type '${type}' is invalid`)
          return
      }

      try {
        for (let i = 0; i < emailContents.length; i++) {
          await SendEmail(emailContents[i])
        }
        logAction(`sent '${type}' to all proponent members`)
      } catch (error) {
        logAction(`Error: sendEmailToAllProponents - ${type} - ${error}`, {
          variant: 'error',
          snackbar: false,
        })
      }

      return
    },
    [allUserLoginNames, config.items, logAction, replaceText]
  )

  const sendEmailToSiteContact = useCallback(
    async (type, options = {}) => {
      if (!config.itemFilter(type).YesNoValue) return

      const { userId, proponentName, proponentId } = options
      let subject = '',
        body = '',
        additionalPairValues = []

      switch (type) {
        case 'removeUserEmail':
          const user = await GetUser(userId)

          additionalPairValues = [
            {
              searchvalue: /\[UserName\]/g,
              newvalue: user.Title,
            },
            {
              searchvalue: /\[Proponent\]/g,
              newvalue: proponentName,
            },
          ]
          break

        case 'newQuestionEmail':
          additionalPairValues = [
            {
              searchvalue: /\[Proponent\]/g,
              newvalue: getProponent(proponentId).Title,
            },
          ]
          break

        case 'newDocumentEmail':
          additionalPairValues = [
            {
              searchvalue: /\[Proponent\]/g,
              newvalue: getProponent(proponentId).Title,
            },
          ]
          break

        default:
          console.error(`sendEmailToSiteContact type '${type}' is invalid`)
          return
      }

      subject = config.itemFilter(type).TextValue
      body = config.itemFilter(type).MultiTextValue

      const newBody = replaceText(body, { additionalPairValues })

      const newSubject = replaceText(subject, { additionalPairValues })

      try {
        await SendEmail({
          to: contactEmailLogin,
          subject: newSubject,
          body: newBody,
        })
        logAction(`sent ${type} to ${contactEmail}`, { snackbar: false })
      } catch (error) {
        logAction(`Error: sendEmailToSiteContact - ${type} - ${error}`, {
          variant: 'error',
          snackbar: false,
        })
      }

      return
    },
    [config.items, contactEmail, contactEmailLogin, getProponent, logAction, replaceText]
  )

  const sendEmailToNewMember = useCallback(
    async (options = {}) => {
      const type = 'addUserEmail'
      if (!config.itemFilter(type).YesNoValue) return

      const { member, proponentName } = options

      const subject = config.itemFilter(type).TextValue
      const body = config.itemFilter(type).MultiTextValue

      const additionalPairValues = [
        {
          searchvalue: /\[AddresseeName\]/g,
          newvalue: member.DisplayText,
        },
        {
          searchvalue: /\[Proponent\]/g,
          newvalue: proponentName,
        },
      ]

      const newBody = replaceText(body, { additionalPairValues })

      const newSubject = replaceText(subject, { additionalPairValues })

      try {
        await SendEmail({
          to: member.Key,
          subject: newSubject,
          body: newBody,
        })
        logAction(`sent welcome email to ${member.DisplayText}`)
      } catch (error) {
        logAction(`Error: sendEmailToNewMember - ${error}`, {
          variant: 'error',
          snackbar: false,
        })
      }

      return
    },
    [config.items, logAction, replaceText]
  )

  return {
    sendEmailToAllProponents,
    sendEmailToCurrentProponentMembers,
    sendEmailToSiteContact,
    sendEmailToNewMember,
  }
}
