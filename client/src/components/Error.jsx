import React from 'react'
import {errorActionsRedirectMap} from '../utils/utils.js'
import {Link} from 'react-router-dom'

function Error({message, action}) {
  return (
    <div>
        <p>{message}</p>
        {
            (action.type == "redirect")?(
                <Link to={errorActionsRedirectMap[action.to]}>{action.to}</Link>
            ):""
        }
    </div>
  )
}

export default Error