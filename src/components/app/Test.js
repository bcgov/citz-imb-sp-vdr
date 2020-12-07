import React from 'react'
import { Public } from 'Components'
import {FormikTest} from 'components/Reusable/Formik/FormikTest'

export const Test = () => {
	const options = {}

	return <Public {...options} />
	// return <FormikTest open={true} close={()=>{}} />
}
