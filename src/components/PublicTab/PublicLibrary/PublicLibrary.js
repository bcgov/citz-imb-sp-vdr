import React, { useEffect } from 'react'
import { useLibrary } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const PublicLibrary = () => {
	const library = useLibrary('Documents')

	// console.log('library :>> ', library);

	useEffect(() => {
		// console.log('library.isLoading :>> ', library.isLoading);
		// console.log('library.list.isLoading :>> ', library.list.isLoading);
		// console.log('library.items.isLoading :>> ', library.items.isLoading);
		return () => {}
	}, [library.isLoading])

	if (library.isLoading) {
		return <LinearProgress />
	}

	if(library.isError){
		return <div>error</div>
	}

	return (
		<div>
			<h2>{library.list.data.CurrentView.Title}</h2>
			{library.render}
		</div>
	)
}
