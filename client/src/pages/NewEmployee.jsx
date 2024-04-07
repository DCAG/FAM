import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EMPLOYEES_CREATE_URL = 'http://localhost:3000/employees/create'

function NewEmployee() {

  const [employee, setEmployee] = useState({})
  const handleSubmit = async (e) => {
    e.PreventDefault()
    const result = await axios.post(`${EMPLOYEES_CREATE_URL}`,employee)
    console.log("result",result)
    //useNavigate()
  }

  return (
    <div>
        <h1>
        New Employee
        </h1>
        <form onClick={handleSubmit} method="post">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" onChange={ e => setEmployee({...employee, firstName: e.target.value})}/>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" onChange={ e => setEmployee({...employee, lastName: e.target.value})} />
            <label htmlFor="startWorkYear">Start Work Year:</label>
            <input type="number" name="starWorktYear" onChange={ e => setEmployee({...employee, startWorkYear: e.target.value})} />
            <label htmlFor="department">Department:</label>
            <select defaultValue={''} name="department" onChange={ e => setEmployee({...employee, department: e.target.value})}>
              <option value="" disabled>Select Department...</option>
              {
                departments.map((department)=>{
                  return (
                    <option key={department._id} value={department._id}>{department.name}</option>
                  )
                })
              }
            </select>
            
            <button type="submit">Save</button>
        </form>

        <Link to="/employees">Cancel</Link>
    </div>
  )
}

export default NewEmployee