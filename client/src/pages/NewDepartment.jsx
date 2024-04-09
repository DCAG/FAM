import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_CREATE_URL = 'http://localhost:3000/departments/create'

function NewDepartment() {
  const [department, setDepartment] = useState({})
  const [employees, setEmployees] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await axios.post(`${DEPARTMENTS_CREATE_URL}`,department)
    console.log("result",result)
    if(result.status==201){
      navigate(`/departments/${result.data._id}/edit`)
    }
  }

  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getEmployees = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(data)
        //console.log(data)
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          localStorage['lastError'] = error?.response?.data?.message  
          // logout:
          logoutUser()
        }
        else{
          localStorage['lastError'] = error
        }
        navigate('/error')
      }
    }

    getEmployees()
    
  },[])

  return (
    <div>
        <h1>New Department</h1>
        <Link to="/Departments">Cancel</Link>
        <form onSubmit={handleSubmit} method="post">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={e=>setDepartment({...department, name: e.target.value})}/> <br />
            <label htmlFor="manager">Manager</label>
            <select name='manager' value={''} onChange={e=>setDepartment({...department, manager: e.target.value})}>
              <option value=''>Select a manager...</option>
              {
                employees.map(employee => {
                  return (
                    <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName}</option>
                  )
                })
              }
            </select>
            <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default NewDepartment