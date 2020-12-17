import React from 'react'
import { Questions } from 'components/ProponentManagementTab/Questions/Questions'
import {FormikTest} from 'components/Reusable/Formik/FormikTest'

export const Test = () => {
	const options = {UUID:'V68C58C'}

	return <Questions {...options} />
	// return <FormikTest open={true} close={()=>{}} />
}
