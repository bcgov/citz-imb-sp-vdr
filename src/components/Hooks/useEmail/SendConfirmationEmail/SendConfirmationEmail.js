import { GetSite, SendEmail } from 'components/Api';



export const SendConfirmationEmail = async (props) => {
	const {
		// addresses,
		proponent,
		subject,
		body,
		additionalReplacementPairs = [],
		contactEmail,
	} = props;

	const site = await GetSite({});



	let replacementPairs = normalReplacementPairs.concat(
		additionalReplacementPairs
	);




};
