import { IconButton, LinearProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
  FormikDialog,
  SendConfirmationEmail,
  useConfig,
  useGroup,
  useLogAction,
} from 'components'
import { SPTable } from 'components/SharePoint'
import React, { useCallback, useMemo, useState } from 'react'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { useProponents } from '../../Hooks'
import { removeItemsDialogOptions } from './removeItemsDialogOptions/removeItemsDialogOptions'

export const GroupTable = (props) => {
  const { groupId, proponentName } = props
  const [dialog, setDialog] = useState({
    open: false,
  })

  const proponents = useProponents()

  const logAction = useLogAction()
  const config = useConfig()

  const proponentGroup = useGroup({ groupId })

  const removeItemDialog = useCallback(
    ({ original }) => {
      removeItemsDialogOptions({
        original,
        setDialog,
        proponentGroup,
        logAction,
        proponentName,
        config,
        reQueryProponents: proponents.reQuery,
      })
    },
    [config, logAction, proponentGroup, proponentName, proponents.reQuery]
  )

  const columns = useMemo(() => {
    if (proponentGroup.isLoading || proponentGroup.isError) return []
    return [
      {
        Header: 'Title',
        accessor: 'Title',
        Filter: true,
        disableFilters: true,
      },
      {
        Header: 'E-mail',
        accessor: 'Email',
        Filter: true,
        disableFilters: true,
      },
      {
        Header: 'Remove',
        id: 'removeMember',
        Cell: ({ row }) => {
          const clickHandler = () => {
            removeItemDialog(row)
          }

          return (
            <IconButton color={'primary'} onClick={clickHandler}>
              <DeleteOutlineIcon />
            </IconButton>
          )
        },
      },
    ]
  }, [proponentGroup.isLoading, proponentGroup.isError, removeItemDialog])

  const data = useMemo(() => {
    if (proponentGroup.isLoading || proponentGroup.isError) return []

    return [...proponentGroup.members]
  }, [proponentGroup.isLoading, proponentGroup.isError, proponentGroup.members])

  const table = useTable(
    { columns, data },
    useFilters,
    useSortBy,
    usePagination
  )

  const addItemDialog = () => {
    setDialog({
      fields: [
        {
          name: 'members',
          label: 'Members',
          initialValue: '',
          control: 'peoplepicker',
        },
      ],
      onSubmit: async (values, { setSubmitting }) => {
        for (let i = 0; i < values.members.length; i++) {
          if (proponents.allUserIds.includes(values.members[i].Key)) {
            alert(
              `${values.members[i].DisplayText} is already a member of a proponent`
            )
            setSubmitting(false)
            return
          }
        }

        const members = values.members.map((member) => member.DisplayText)
        const addUserEmail = config.items.filter(
          (item) => item.Key === 'addUserEmail'
        )[0]

        const contactEmail = config.items.filter(
          (item) => item.Key === 'contactEmail'
        )[0]

        try {
          await proponentGroup.addMember(values)
          logAction(`added ${members.join('; ')} to ${proponentName} group`)
          values.members.map(async (member) => {
            await SendConfirmationEmail({
              addresses: member.Key,
              proponent: proponentName,
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
          proponents.reQuery()
          setSubmitting(false)
          setDialog({ open: false })
        } catch (error) {
          throw error
        }
      },
      open: true,
      close: () => {
        setDialog({ open: false })
      },
      title: 'Add Member',
    })
  }

  const tableActions = [
    <IconButton aria-label='add' color={'secondary'} onClick={addItemDialog}>
      <AddIcon />
    </IconButton>,
  ]

  if (proponentGroup.isLoading) return <LinearProgress />

  if (proponentGroup.isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {proponentGroup.error}
      </Alert>
    )
  }

  return (
    <>
      <SPTable
        table={table}
        columns={columns}
        title={proponentGroup.group.Title}
        tableActions={tableActions}
      />
      <FormikDialog {...dialog} />
    </>
  )
}
