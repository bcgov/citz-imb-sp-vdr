import React from 'react'
import { Button } from '@material-ui/core'

export const ViewAnswerButton = ({itemId, onClick}) => {
    const clickHandler = ()=>{
        console.log('ViewAnswerButton itemId :>> ', itemId);
        onClick(itemId)
    }
	return <Button onClick={clickHandler} color='secondary'>View Answer</Button>
}
