import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import {
	useConfig,
	useCurrentUser,
	useLogAction,
	FormikDialog,
	FormatText,
	Home,
} from 'Components'

export const TermsOfService = () => {
	const [dialog, setDialog] = useState({ open: false })
	const [hasCookie, setHasCookie] = useState(false)

	const config = useConfig()

	// const currentUser = useContext(UserContext)
	const currentUser = useCurrentUser()

	const cookies = new Cookies()

	const { logAction } = useLogAction()

	useEffect(() => {
		if (!config.isLoading) {
			const TOSConfig = config.items.data.find(
				(item) => item.Key === 'TOS'
			)

			if (
				cookies.get(
					`${TOSConfig.Key}-${currentUser.id}-${TOSConfig.Modified}`
				)
			) {
				setHasCookie(true)
			} else {
				setHasCookie(false)
			}

			setDialog({
				onSubmit: (values, { setSubmitting }) => {
					cookies.set(
						`${TOSConfig.Key}-${currentUser.id}-${TOSConfig.Modified}`,
						true,
						{
							path: '/',
							maxAge: TOSConfig.NumberValue * 24 * 60 * 60,
						}
					)
					logAction('agreed to TOS', false)
					setHasCookie(true)
				},
				open: true,
				close: async () => {
					await logAction('disagreed to TOS', false)
					window.location = '/_layouts/signout.aspx'
				},
				title: TOSConfig.TextValue,
				dialogContent: (
					<div
						dangerouslySetInnerHTML={{
							__html: FormatText(TOSConfig.MultiTextValue),
						}}
					/>
				),
				submitButtonText: 'Accept',
				cancelButtonText: 'Reject',
			})
		}
		return () => {}
	}, [config.isLoading])

	if (!hasCookie) return <FormikDialog {...dialog} />

	return <Home />
}
