import { IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { useConfig, useLogAction } from 'components/Hooks'
import { FormikDialog } from 'components/Reusable'
import React, { useState } from 'react'
import { getDialogFields } from './getDialogFields/getDialogFields'

export const EditItem = (props) => {
  const { original, values } = props
  const [formOpen, setFormOpen] = useState(false)

	const { update } = useConfig()
	const logAction = useLogAction()

  const handleSubmit = async (values, { setSubmitting }) => {
    const item = { ...values, Id: original.Id }

    await update(item)
	  logAction(`updated '${original.Title}'`)

    setSubmitting(false)
    setFormOpen(false)
  }

  return (
    <>
      <IconButton onClick={() => setFormOpen(true)}>
        <Edit />
      </IconButton>
      <FormikDialog
        fields={getDialogFields(original)}
        onSubmit={values.Key === 'allowSubmissions' ? null : handleSubmit}
        open={formOpen}
        close={() => setFormOpen(false)}
        title={original.Title}
        instructions={original.Instructions}
        submitButtonText='Submit'
        cancelButtonText='Cancel'
      />
    </>
  )
}
