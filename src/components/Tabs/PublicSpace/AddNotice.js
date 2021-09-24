import { Button } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import {
    useCurrentUser,
    useList,
    useLogAction,
} from 'components/Hooks'
import { FormikDialog } from 'components/Reusable'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'

export const AddNotice = () => {
    const title = 'Add Notice'

    const noticeList = useList('Notices')

    const currentUser = useCurrentUser()

    const logAction = useLogAction()

    const [formOpen, setFormOpen] = useState(false)

    const fields = [
        {
            name: 'Notice',
            label: 'Notice',
            initialValue: '',
            validationSchema: Yup.string().required('Required').min(5),
            required: true,
            control: 'textarea',
        },
    ]

    const handleClick = useCallback(() => {
        setFormOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setFormOpen(false)
    }, [])

    const onSubmit = useCallback(
        async (values, { setSubmitting }) => {

            values.AuthorId = currentUser.id
            try {
                await noticeList.add(values)
                logAction(`successfully added ${values.Notice}`)

            } catch (error) {
                console.error('error submitting notice', error)
                logAction(`failed to submit ${values.Notice}`, {
                    variant: 'error',
                })
            }
            setSubmitting(false)
            handleClose()
        },
        [
            currentUser,
            handleClose,
            logAction,
            noticeList,
        ]
    )

    return (
        <>
            <Button
                color={'secondary'}
                onClick={handleClick}
                endIcon={<PublishIcon />}>
                {title}
            </Button>
            <FormikDialog
                open={formOpen}
                close={handleClose}
                fields={fields}
                onSubmit={onSubmit}
                title={title}
            />
        </>
    )
}
