import {GetListItems} from 'citz-imb-sp-utilities'
import {SendConfirmationEmail} from 'Components'

export const SendQuestionConfirmationEmail = async (users, proponent) => {
    console.log('props :>> ', {users, proponent});

    const response = await GetListItems({
        listName: 'Config',
        filter: `Key eq 'addQuestionEmail'`,
    })
console.log('response :>> ', response);
    console.log('formatted response :>> ', {subject: response[0].TextValue, body: response[0].MultiTextValue});

    SendConfirmationEmail(users, proponent, response[0].TextValue, response[0].MultiTextValue)

}