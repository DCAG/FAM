import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_CREATE_URL = 'http://localhost:3000/employees/create'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function NewEmployee() {

  const [departments, setDepartments] = useState([]) // {id,name,manager}
  const [selectedDepartment, setSelectedDepartment] = useState('')
  
  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  const [employee, setEmployee] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await axios.post(`${EMPLOYEES_CREATE_URL}`,employee)
    console.log("result",result)
    if(result.status==201){
      navigate(`/employees/${result.data._id}/edit`)
    }
  }

  useEffect(() => {
    const getDepartments = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(DEPARTMENTS_URL, { headers: headers })
        setDepartments(data)
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          // should i return an error component instead?
          localStorage['lastError'] = error?.response?.data?.message  
          // logout:
          //sessionStorage.clear() // TODO: replace with logout function (that calls this probably...)
          logoutUser()
          //return (<Error message={error.response.data.message} action={error.response.data.action} />)
        }
        else{
          localStorage['lastError'] = error
        }
        navigate('/error')
      }
    }

    getDepartments()
    
  },[])

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