import React from 'react'
import { Questions } from 'components/ProponentManagementTab/Questions/Questions'
import {FormikTest} from 'components/Reusable/Formik/FormikTest'
import {ProponentManagementTab} from 'components/ProponentManagementTab/ProponentManagementTab'

export const Test = () => {
	const options = {UUID:'V68C58C'}

	return <ProponentManagementTab />
	// return <FormikTest open={true} close={()=>{}} />
}
