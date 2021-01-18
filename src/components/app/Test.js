import React from 'react'
import { Questions } from 'components/ProponentManagementTab/Questions/Questions'
import {FormikTest} from 'components/Reusable/Formik/FormikTest'
import {Proponent} from 'components/ProponentTab/Proponent/Proponent'

export const Test = () => {
	const options = {UUID:'V68C58C'}

	return <Proponent {...options} />
	// return <FormikTest open={true} close={()=>{}} />
}
