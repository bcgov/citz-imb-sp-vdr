import React from 'react'
import { ProponentQuestionList } from 'components/ProponentTab/ProponentQuestionList/ProponentQuestionList'
// import {FormikTest} from 'components/Reusable/Formik/FormikTest'

export const Test = () => {
	const options = {UUID:'V68C58C'}

	return <ProponentQuestionList {...options} />
	// return <FormikTest open={true} close={()=>{}} />
}
