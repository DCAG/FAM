import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../utils/useAuth'

const DEPARTMENTS_URL = 'http://localhost:3000/departments'
const EMPLOYEES_URL = 'http://localhost:3000/employees'

function Departments() {

  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getDepartments = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(DEPARTMENTS_URL, { headers: headers })
        setDepartments(data)
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
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

    getDepartments()
    
  },[])

  return (
    <div>
        <h1>
        Departments
        </h1>

        <Link to='new'>New Department</Link> <br />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manager</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map(department => {
                return(
                <tr key={department._id}>
                  <td>
                    <Link to={`${department._id}/edit`}>{department.name}</Link>
                  </td>
                  <td>
                    {department.manager ? department.manager?.firstName + ' ' + department.manager?.lastName : ''}
                  </td>
                  <td>
                    <ul>
                    {
                      employees.filter(employee => employee.department?._id === department._id)
                      .map((employee) => {
                        return (
                          <li key={employee._id}>
                            {employee.firstName + ' ' + employee.lastName}
                          </li>
                        )
                      })
                    }
                    </ul>
                  </td>
                </tr>
                )
              })
            }
            </tbody>
        </table>
    </div>
  )
}

export default Departments