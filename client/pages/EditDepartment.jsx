import React from 'react'

function EditDepartment() {
  return (
    <div>
        <h1>EditDepartment</h1>
        <div>
            Name: <input type="text" name="name" id="" /> <br />
            Manager: <input type="text" name="" id="" /> <br />
            <button type="button">Update</button>
            <button type="button">Delete</button> <br />
            <h2>Add employees to this department</h2>
            <select>
                {
                    department.employees.map(employee => {
                        <option>employee</option>
                    })
                }
            </select>
            <button type="button">Add</button>
        </div>
    </div>
  )
}

export default EditDepartment