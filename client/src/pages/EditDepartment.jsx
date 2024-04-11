import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function EditDepartment() {

  const {id: paramsId} = useParams()
  const [department, setDepartment] = useState({})
  const [employees, setEmployees] = useState([])
  const [members, setMembers] = useState([])
  const [outsiders, setOutsiders] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  
  const navigate = useNavigate()
  const {logoutUser} = useAuth()
  
  useEffect(() => {
    const getDepartment = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data:departmentData} = await axios.get(`${DEPARTMENTS_URL}/${paramsId}`, { headers: headers })
        setDepartment(departmentData)
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          // should i return an error component instead?
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

    getDepartment()
    
  },[paramsId])

  useEffect(() => {
    if(selectedEmployee === ''){
      //in case the department is populated in mongoose (on server side) the 'department' property will be an object (hence accessing _id), otherwise an id string
      setMembers(employees.filter(employee => (employee.department?._id??employee.department) === paramsId))
      setOutsiders(employees.filter(employee => (employee.department?._id??employee.department) !== paramsId))
    }
  },[employees, selectedEmployee])

  const handleAddClick = async () => {  
    try{
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      const index = employees.findIndex(employee=>employee._id === selectedEmployee)
      employees[index].department = paramsId
      const result = await axios.put(`${EMPLOYEES_URL}/${selectedEmployee}`, employees[index], { headers: headers })
      console.log("result",result??'')
      setSelectedEmployee('')
    }
    catch(err){
      console.log(err)
    }
  }

  const handleUpdateClick = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.put(`${DEPARTMENTS_URL}/${paramsId}`, department, { headers: headers })
    console.log("result",result)
  }

  const handleDeleteClick = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.delete(`${DEPARTMENTS_URL}/${paramsId}`,{ headers: headers })
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