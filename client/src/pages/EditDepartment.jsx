import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getHeaders } from '../utils/utils'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function EditDepartment() {
  // THIS department
  const {id: departmentId} = useParams()
  const [department, setDepartment] = useState({name: '', manager: ''})
  // list all employees of in the department and ourside of it. May select outsiders to become members.
  const [employees, setEmployees] = useState([])
  const [members, setMembers] = useState([])
  const [outsiders, setOutsiders] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  
  const navigate = useNavigate()
  const {logoutUser} = useAuth()
  
  useEffect(() => {
    const getDepartment = async () => {
      const headers = getHeaders()
      try{
        const {data:departmentData} = await axios.get(`${DEPARTMENTS_URL}/${departmentId}`, { headers: headers })
        setDepartment(departmentData)
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
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

    getDepartment()
    
  },[departmentId])

  useEffect(() => {
    if(selectedEmployee === ''){
      // in case the department is populated in mongoose (on server side)
      // the 'department' property will be an object (hence accessing _id), otherwise an id string
      setMembers(employees.filter(employee => (employee.department?._id??employee.department) === departmentId))
      setOutsiders(employees.filter(employee => (employee.department?._id??employee.department) !== departmentId))
    }
  },[employees, selectedEmployee])

  // add "outsider" employee to be a member
  const handleAddClick = async () => {  
    if(selectedEmployee === ''){
      console.log('Select an employee before clicking on \"Add Employee\"')
      return
    }

    try{
      const index = employees.findIndex(employee=>employee._id === selectedEmployee)
      employees[index].department = departmentId
      const headers = getHeaders()
      const result = await axios.put(`${EMPLOYEES_URL}/${selectedEmployee}`, employees[index], { headers: headers })
      console.log("result",result??'')
      // triggers useEffect block and rendering of both lists
      // (list of options in select-employee-to-add and list of members of this department)
      setSelectedEmployee('')
    }
    catch(err){
      console.log(err)
    }
  }

  // update department object without the members list
  const handleUpdateClick = async () => {
    const headers = getHeaders()
    const result = await axios.put(`${DEPARTMENTS_URL}/${departmentId}`, department, { headers: headers })
    console.log("result",result)
  }

  // delete department object including all employees listed as its' members
  const handleDeleteClick = async () => {
    const headers = getHeaders()
    const result = await axios.delete(`${DEPARTMENTS_URL}/${departmentId}`,{ headers: headers })
    console.log("result",result)
    navigate('/departments')
  }

  return (
    <div>
        <h1>Edit Department: {department.name}</h1>
        <div>
            Name: <input type="text" name="name" value={department.name} onChange={e=>setDepartment({...department,name:e.target.value})} /> <br />
            Manager: <select value={department.manager?._id??(department.manager??'')} onChange={e=>setDepartment({...department,manager:e.target.value})}>
              <option value='' disabled>Select a manager...</option>
              {
                employees
                .map(employee => {
                  return (
                    <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName}</option>
                  )
                })
              }
            </select>
            <br />
            <br />            
            <button type="button" onClick={handleUpdateClick}>Update</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button>
            <br />

            <h2>List of Employees</h2>
            <ul>
              {
                members
                .map(employee => {
                  return (
                    <li key={employee._id}>
                      {employee.firstName + ' ' + employee.lastName}
                    </li>
                  )
                })
              }
            </ul>

            <select value={selectedEmployee} onChange={e=>setSelectedEmployee(e.target.value)}>
              <option value='' disabled>Select employee...</option>
              {          
                outsiders
                .map(employee => {
                  return (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName + ' ' + employee.lastName}
                    </option>
                  )
                })
              }
            </select>
            <button type="button" onClick={handleAddClick}>Add Employee</button>
        </div>
    </div>
  )
}

export default EditDepartment