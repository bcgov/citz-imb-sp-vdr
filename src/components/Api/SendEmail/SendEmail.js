import { RestCall } from '../RestCall/RestCall';

export const SendEmail = async ({
	to,
	from,
	cc = [],
	bcc = [],
	subject,
	body,
}) => {
	const endPoint = '/_api/SP.Utilities.Utility.SendEmail';

	if (!Array.isArray(to)) to = [to];

	const restBody = {
		properties: {
			__metadata: {
				type: 'SP.Utilities.EmailProperties',
			},
			To: {
				results: to,
			},
			Body: body,
			Subject: subject,
			CC: {
				results: cc,
			},
			BCC: {
				results: bcc,
			},
		},
	};

	if (from) restBody.properties.From = from;

	const response = await RestCall({
		endPoint,
		method: 'post',
		body: restBody,
	});

	return response.d;
};
