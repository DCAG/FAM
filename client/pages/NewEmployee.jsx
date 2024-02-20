import React from 'react'

function NewEmployee() {
  return (
    <div>
        <h1>
        NewEmployee
        </h1>
        <form action="" method="post">
            <label htmlFor=""></label><input type="text" name="" id="" />
            
            <button type="submit">Save</button>
        </form>

        <Link to="/employees">Cancel</Link>
    </div>
  )
}

export default NewEmployee