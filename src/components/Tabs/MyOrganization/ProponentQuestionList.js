import { Alert } from '@material-ui/lab'
import {
  useConfig,
  useCurrentUser,
  useList,
  useLogAction,
  useProponents,
} from 'components/Hooks'
import { AnswerCell, SelectColumnFilter } from 'components/Reusable'
import { SPList } from 'components/SharePoint'
import React, { useCallback } from 'react'

export const ProponentQuestionList = () => {
  const currentUser = useCurrentUser()
  const listName = `${currentUser.proponent}_Questions`


  const logAction = useLogAction()

  const config = useConfig()
  const { update } = useList(listName)

  const handleWithdraw = useCallback(
    async (row) => {
      const withdrawEmailConfig = config.items.filter(
        (item) => item.Key === 'withdrawQuestionEmail'
      )[0]

      const contactEmail = config.items.filter(
        (item) => item.Key === 'withdrawQuestionEmail'
      )[0].TextValue

      try {
        await update({
          Id: row.original.Id,
          Withdrawn: true,
          AnswerStatus: 'Withdrawn',
          Assignee: '',
        })
        logAction(`successfully withdrew '${row.values.Question}'`)
        //! await proponents.sendEmailToProponents({
        //   subject: withdrawEmailConfig.TextValue,
        //   body: withdrawEmailConfig.MultiTextValue,
        // })
      } catch (error) {
        console.error(error)
        logAction(`failed to withdraw '${row.values.Question}'`, {
          variant: 'error',
        })
      }
    },
    []
  )

  const initialState = { sortBy: [{ id: 'Created', desc: true }] }

  const customColumns = [
    {
      Filter: SelectColumnFilter,
      accessor: 'AnswerStatus',
      Header: 'Status / Answer',
      Cell: ({ value, row }) => {
        return (
          <AnswerCell
            row={row}
            showWithdrawButton={true}
            handleWithdraw={handleWithdraw}
            value={value}
            listName={listName}
          />
        )
      },
    },
  ]

  if (!currentUser.isProponent)
    return <Alert severity={'info'}>User is not a proponent</Alert>

  return (
    <SPList
      listName={listName}
      customColumns={customColumns}
      initialState={initialState}
      title={'Submitted Questions'}
      columnFiltering={true}
      allowUpload={true}
    />
  )
}
