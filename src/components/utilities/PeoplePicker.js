import React, { useEffect } from 'react'

export default function PeoplePicker(props) {
    console.log("People Picker", props)

    const initializePeoplePicker = (peoplePickerElementId, schema) => {
        // var schema = {};
        // schema['PrincipalAccountType'] = 'User';
        // schema['SearchPrincipleSource'] = 15;
        // schema['ResolvePrincipalSource'] = 15;
        // schema['AllowMultipleValues'] = false;
        // schema['MaximumEntitySuggestions'] = 5;
        // schema['Width'] = '250px';
        // schema['SharePointGroupID'] = group || null;

        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    }

    /*
    peoplePicker.initializePeoplePicker("addUser", {
          PrincipalAccountType: "User",
          SearchPrincipleSource: 15,
          ResolvePrincipalSource: 15,
          AllowMultipleValues: false,
          MaximumEntitySuggestions: 5,
          Width: "250px",
          SharePointGroupID: null
        });

    */

    useEffect(() => {
        //add the js libraries needed for peoplepicker
        const head = document.getElementsByTagName("head")[0];
        

        const clienttemplates = document.createElement("script");
        clienttemplates.type = "text/javascript";
        clienttemplates.src = "_layouts/15/clienttemplates.js";
        head.appendChild(clienttemplates);

        const clientforms = document.createElement("script");
        clientforms.type = "text/javascript";
        clientforms.src = "_layouts/15/clientforms.js";
        head.appendChild(clientforms);

        const clientpeoplepicker = document.createElement("script");
        clientpeoplepicker.type = "text/javascript";
        clientpeoplepicker.src = "_layouts/15/clientpeoplepicker.js";
        head.appendChild(clientpeoplepicker);

        const autofill = document.createElement("script");
        autofill.type = "text/javascript";
        autofill.src = "_layouts/15/autofill.js";
        head.appendChild(autofill);
        return
    }, [])

    return <div id=''></div>
}
