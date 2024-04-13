import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getHeaders } from '../utils/utils'
import useAuth from '../utils/useAuth'

const EMPLOYEES_CREATE_URL = 'http://localhost:3000/employees/create'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function NewEmployee() {
  const [departments, setDepartments] = useState([])
  const [employee, setEmployee] = useState({firstName: '', lastName: ''})

  const navigate = useNavigate()
  const {logoutUser} = useAuth();

  useEffect(() => {
    const getDepartments = async () => {
      const headers = getHeaders()
      try{
        const {data} = await axios.get(DEPARTMENTS_URL, { headers: headers })
        setDepartments(data)
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          localStorage['lastError'] = error.response.data.message  
          logoutUser()
        }
        else{
          localStorage['lastError'] = error
        }
        navigate('/error')
      }
    }

    getDepartments()
    
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const headers = getHeaders()
    const result = await axios.post(`${EMPLOYEES_CREATE_URL}`,employee, {headers: headers})
    console.log("result",result)
    if(result.status==201){
      navigate(`/employees/${result.data._id}/edit`)
    }
  }

  return (
    <div>
        <h1>
        New Employee
        </h1>
        <form onSubmit={handleSubmit} method="post">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" onChange={ e => setEmployee({...employee, firstName: e.target.value})}/> <br />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" onChange={ e => setEmployee({...employee, lastName: e.target.value})} /> <br />
            <label htmlFor="startWorkYear">Start Work Year:</label>
            <input type="number" name="starWorktYear" onChange={ e => setEmployee({...employee, startWorkYear: e.target.value})} /> <br />
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
            <br />
            
            <button type="submit">Save</button>
        </form>

        <Link to="/employees">Cancel</Link>
    </div>
  )
}

export default NewEmployee