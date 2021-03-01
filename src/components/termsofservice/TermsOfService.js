import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import {
	ConfigContext,
	UserContext,
	useLogAction,
	FormikDialog,
	FormatText,
	Home,
} from 'Components'

export const TermsOfService = () => {
	const [dialog, setDialog] = useState({ open: false })
	const [hasCookie, setHasCookie] = useState(false)

	const { items: configItems, isLoading: configIsLoading } = useContext(
		ConfigContext
	)
	const currentUser = useContext(UserContext)

	const cookies = new Cookies()

	const logAction = useLogAction()

	useEffect(() => {
		console.log('configIsLoading :>> ', configIsLoading)
		if (!configIsLoading) {
			if (
				cookies.get(
					`${configItems.TOS.Key}-${currentUser.id}-${configItems.TOS.Modified}`
				)
			) {
				setHasCookie(true)
			} else {
				setHasCookie(false)
			}

			setDialog({
				onSubmit: (values, { setSubmitting }) => {
					cookies.set(
						`${configItems.TOS.Key}-${currentUser.id}-${configItems.TOS.Modified}`,
						true,
						{
							path: '/',
							maxAge: configItems.TOS.NumberValue * 24 * 60 * 60,
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
				title: configItems.TOS.TextValue,
				dialogContent: (
					<div
						dangerouslySetInnerHTML={{
							__html: FormatText(configItems.TOS.MultiTextValue),
						}}
					/>
				),
				submitButtonText: 'Accept',
				cancelButtonText: 'Reject',
			})
		}
		return () => {}
	}, [configItems, configIsLoading])

	return hasCookie ? <Home /> : <FormikDialog {...dialog} />
}
