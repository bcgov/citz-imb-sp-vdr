import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AppContent } from 'Components'

export const LoadTermsOfService = () => {
	const [isLoading, setIsLoading] = useState(true)

	return isLoading ? <CircularProgress /> : <AppContent />
}
