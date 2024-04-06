import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
//const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function Employees() {
  const [employees, setEmployees] = useState([]) // {id, firstName, lastName, department, shifts}
  const [departments, setDepartments] = useState([]) // {id,name,manager}
  const [selectedDepartment, setSelectedDepartment] = useState('')
  
  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getEmployees = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(data)
        //POPULATE filter by department
        const employeesDepartments = [... new Set(data.map(item=>item.department.name))]
        console.log("Pages/Employees/useEffect/groupByDepartments",employeesDepartments)
        setDepartments(employeesDepartments)
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

    getEmployees()
    
  },[])

  return (
    <div>
        <h1>
            Employees
        </h1>
        
        {console.log("departments",departments)}

        <Link to="add">Add Employee</Link> <br />
        Filter By:
        <select name="" id="" defaultValue={""} onChange={e=>{setSelectedDepartment(e.target.value)}}>
          <option key="_" value="">All Departments</option>
          {
            departments.map(department => {
              return (
                <option key={department} value={department}>{department}</option>
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
            {
                employees.filter((employee)=>{return !selectedDepartment || employee.department.name===selectedDepartment}).map((employee) => {
                    return (
                        <tr>
                          <td>
                            <Link to={`/employees/${employee._id}/edit`}>{employee.firstName} {employee.lastName}</Link>
                          </td>
                          <td>
                            <Link to={`/departments/${employee.department._id}/edit`}>{employee.department.name}</Link>
                          </td>
                          <td>
                            <ul>
                            {
                              employee.shits?.map(shift => {
                                return (
                                  <li key={shift._id}>{shift}</li>
                                )
                              })
                            }
                            </ul>
                            {/* <EmployeeShifts data={employee.shifts} /> */}
                            {/* date & time */}
                          </td>
                        </tr>
                    )
                })
            }
        </table>
    </div>
  )
}

export default Employees