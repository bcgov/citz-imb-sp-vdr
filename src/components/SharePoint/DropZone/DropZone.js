import React, { useMemo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import {
	Container,
	Paper,
	Typography,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	List,
	ListItem,
} from '@material-ui/core'

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	// borderRadius: 2,
	borderColor: 'transparent',
	borderStyle: 'solid',
	// backgroundColor: '#fafafa',
	// color: '#bdbdbd',
	// outline: 'none',
	// transition: 'border .24s ease-in-out',
}

const activeStyle = {
	borderColor: '#00ff00',
}

const acceptStyle = {
	borderColor: '#0000ff',
}

const rejectStyle = {
	borderColor: '#ff0000',
}

export const DropZone = (props) => {
	// console.log('DropZone props :>> ', props)

	const { setAcceptedFiles } = props

	const dzone = useDropzone()
	// console.log('dzone :>> ', dzone)

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = dzone

	// console.log('getInputProps() :>> ', getInputProps())

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	)

	useEffect(() => {
		// console.log('acceptedFiles :>> ', acceptedFiles)
		setAcceptedFiles(acceptedFiles)
		return () => {}
	}, [acceptedFiles])

	return (
		<Container>
			<Card>
				<CardContent
					{...getRootProps({
						className: 'dropzone',
						style,
					})}>
					<input id={'getFile'} {...getInputProps()} />
					<Typography>
						Drag documents here to upload, or click to browse for
						documents
					</Typography>
					<List>
						{acceptedFiles.map((file) => {
							// console.log('file :>> ', file)
							return (
								<ListItem key={file.path}>
									{file.path} - {file.size} bytes
								</ListItem>
							)
						})}
					</List>
				</CardContent>
			</Card>
		</Container>
	)
}
