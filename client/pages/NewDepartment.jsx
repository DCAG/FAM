import React from 'react'
import {Link} from 'react-router-dom'

function NewDepartment() {
  return (
    <div>
        <h1>NewDepartment</h1>
        <Link to="/Departments">Cancel</Link>
        <form action="" method="post">
            <label htmlFor="">Name</label> <input type="text" name="name" id="" />
            <label htmlFor="">Manager</label> <input type="text" name="" id="" />
            <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default NewDepartment