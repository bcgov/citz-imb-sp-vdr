import {
	Card,
	CardContent,
	Container,
	List,
	ListItem,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderColor: '#234075',
	borderStyle: 'solid',
};

const activeStyle = {
	borderColor: '#00ff00', //green
};

const acceptStyle = {
	borderColor: '#0000ff', //blue
};

const rejectStyle = {
	borderColor: '#ff0000', //red
};

export const DropZone = (props) => {
	const { setAcceptedFiles } = props;

	const dzone = useDropzone();

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = dzone;

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	useEffect(() => {
		setAcceptedFiles(acceptedFiles);
		return () => {};
	}, [acceptedFiles, setAcceptedFiles]);

	return (
		<Container>
			<Card>
				<CardContent
					{...getRootProps({
						className: 'dropzone',
						style,
					})}>
					<input id={'getFile'} {...getInputProps()} />
					<Typography color={'primary'}>
						Drag documents to this box to upload
					</Typography>
					<Typography>
						or
					</Typography>
					<Typography color={'primary'}>
						Click this box to browse for
						documents
					</Typography>
					<List>
						{acceptedFiles.map((file) => {
							return (
								<ListItem key={file.path}>
									{file.path} - {file.size} bytes
								</ListItem>
							);
						})}
					</List>
				</CardContent>
			</Card>
		</Container>
	);
};
