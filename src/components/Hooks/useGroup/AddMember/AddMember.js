import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { FormikDialog } from 'components/Reusable'
import React, { useCallback, useState } from 'react'

export const AddMember = (props) => {
  const { addMemberSubmit, children } = props

  const [dialog, setDialog] = useState({
    open: false,
  })

  const addItemDialog = useCallback(() => {
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
        await addMemberSubmit(values)
        setSubmitting(false)
        setDialog({ open: false })
      },
      open: true,
      close: () => {
        setDialog({ open: false })
      },
      title: 'Add Member',
    })
  }, [addMemberSubmit])

  return (
    <>
      <Button color={'secondary'} onClick={addItemDialog} endIcon={<AddIcon />}>
        {children}
      </Button>
      <FormikDialog {...dialog} />
    </>
  )
}
