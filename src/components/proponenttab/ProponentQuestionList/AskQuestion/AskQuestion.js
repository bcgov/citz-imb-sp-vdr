import React, { useState } from 'react';
import {
	IconButton,
	useList,
	SendConfirmationEmail,
	useConfig,
	useLogAction,
} from 'components';
import {
	FormikDialog,
	useCurrentUser,
	useProponents,
} from 'components/Reusable';
import { GetGroupMembers, GetUserByEmail } from 'components/ApiCalls';
import * as Yup from 'yup';

export const AskQuestion = (props) => {
	const { listName } = props;

	const questionList = useList({ listName });
	const currentUser = useCurrentUser();
	const proponents = useProponents();
	const config = useConfig();
	const logAction = useLogAction();

	const addQuestionEmail = config.filter(
		(item) => item.Key === 'addQuestionEmail'
	)[0];
	const newQuestionEmail = config.filter(
		(item) => item.Key === 'newQuestionEmail'
	)[0];
	const contactEmail = config.filter(
		(item) => item.Key === 'contactEmail'
	)[0];

	const [formOpen, setFormOpen] = useState(false);

	const fields = [
		{
			name: 'Title',
			label: 'Question',
			initialValue: '',
			validationSchema: Yup.string().required('Required'),
			required: true,
			control: 'input',
		},
	];

	const handleClick = () => {
		setFormOpen(true);
	};

	const handleClose = () => {
		setFormOpen(false);
	};

	const sendEmails = async () => {
		const proponent = proponents.get(currentUser.proponent);

		const groupMembers = await GetGroupMembers({
			groupId: proponent.GroupId,
		});

		for (let i = 0; i < groupMembers.length; i++) {
			console.log('addQuestionEmail :>> ', addQuestionEmail);
			await SendConfirmationEmail({
				addresses: groupMembers[i].LoginName,
				proponent: proponent.Title,
				subject: addQuestionEmail.TextValue,
				body: addQuestionEmail.MultiTextValue,
				additionalReplacementPairs: [
					{
						searchvalue: /\[UserName\]/g,
						newvalue: currentUser.name,
					},
					{
						searchvalue: /\[AddresseeName\]/g,
						newvalue: groupMembers[i].Title,
					},
				],
				contactEmail,
			});
		}
		const contactEmailUser = await GetUserByEmail({
			email: contactEmail.TextValue,
		});

		await SendConfirmationEmail({
			addresses: contactEmailUser[0].LoginName,
			proponent: proponent.Title,
			subject: newQuestionEmail.TextValue,
			body: newQuestionEmail.MultiTextValue,
			contactEmail,
		});
	};

	const onSubmit = async (values, { setSubmitting }) => {
		let latestItem = { Id: 0 };
		let nextQuestionNumber;

		if (questionList.items.length > 0) {
			for (let i = 0; i < questionList.items.length; i++) {
				if (questionList.items[i].Id > latestItem.Id)
					latestItem = questionList.items[i];
			}

			nextQuestionNumber = parseInt(latestItem.QuestionID.slice(-3)) + 1;
		} else {
			nextQuestionNumber = 1;
		}

		const nextQuestionNumberString = nextQuestionNumber.toString();

		values.QuestionID = `${
			currentUser.proponent
		}-${nextQuestionNumberString.padStart(3, '0')}`;

		try {
			await questionList.addItem(values);
			await sendEmails();
			logAction(`successfully asked ${values.Title}`);
		} catch (error) {
			console.error('error submitting question', error);
		}
		setSubmitting(false);
		handleClose();
	};

	return (
		<>
			<IconButton type={'add'} onClick={handleClick} />
			<FormikDialog
				open={formOpen}
				close={handleClose}
				fields={fields}
				onSubmit={onSubmit}
				title={'Ask a Question'}
			/>
		</>
	);
};
