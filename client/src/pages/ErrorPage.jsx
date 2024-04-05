import React from 'react'

function ErrorPage() {
  
  return (
    <div>
        <h1>{localStorage['lastError']}</h1>      
    </div>
  )
}

export default ErrorPage