import React from 'react'
import { ProponentQuestionList } from 'Components'
import {FormikTest} from 'components/Reusable/Formik/FormikTest'

export const Test = () => {
	const options = {}

	return <ProponentQuestionList {...options} />
	// return <FormikTest open={true} close={()=>{}} />
}
