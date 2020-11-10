import React, { useState, useEffect } from 'react'
import { ProponentQuestionDialog } from 'Components'
const options = {
	proponentName: 'Proponent A',
	open: true,
	listName: `VBFD126_Questions`,
	closeDialog: () => {},
}
export const Test = () => {
	return <ProponentQuestionDialog {...options} />
}
