import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getHeaders } from '../utils/utils'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const navigate = useNavigate()
  const {logoutUser} = useAuth()
  
  useEffect(() => {
    const getEmployees = async () => {
      const headers = getHeaders()
      try{
        const {data} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(data)
        const {data:departmentsData} = await axios.get(DEPARTMENTS_URL, {headers: headers})
        setDepartments(departmentsData)
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

    getEmployees()
    
  },[])

  const shiftComparer = (a, b) => ('' + a.date + a.startingHour + a.endingHour).localeCompare('' + b.date + b.startingHour + b.endingHour)

  return (
    <div>
        <h1>
            Employees
        </h1>
        <Link to="new">Add Employee</Link> <br />
        Filter By:
        <select defaultValue="" onChange={e=>{setSelectedDepartment(e.target.value)}}>
          <option value="">All Departments</option>
          {
            departments.map(department => {
              return (
                <option key={department._id} value={department._id}>{department.name}</option>
              )
            })
          }
        </select> <br />
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Department</th>
              <th>Shifts</th>
            </tr>
          </thead>
          <tbody>
            {
              employees
              .filter((employee)=>{
                return !selectedDepartment || employee.department?._id===selectedDepartment
              })
              .map((employee) => {
                return (
                  <tr key={employee._id}>
                      <td>
                        <Link to={`/employees/${employee._id}/edit`}>{employee.firstName} {employee.lastName}</Link>
                      </td>
                      <td>
                        <Link to={`/departments/${employee.department?._id}/edit`}>{employee.department?.name}</Link>
                      </td>
                      <td>
                        <ul style={{listStyleType:'none',margin:0,padding:0, textAlign:'left'}}>
                        {
                          /*
                          Example:
                          _id: new ObjectId('6612b46247ee8ff25451f5b4'),
                          date: 2024-01-27T00:00:00.000Z,
                          startingHour: 16,
                          endingHour: 17,
                          */
                          employee.shifts
                          ?.sort(shiftComparer)
                          .map(shift => {
                            return (
                              <li key={shift._id}>{shift.date?.replace(/T.*Z/g,'')} {shift.startingHour}-{shift.endingHour}</li>
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

export default Employees