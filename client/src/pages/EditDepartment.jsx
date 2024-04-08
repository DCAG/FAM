import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function EditDepartment() {
  const {id} = useParams()
  const [department, setDepartment] = useState({})
  const [allEmployees, setAllEmployees] = useState([]) //MARK: IMPLEMENT NAME CHANGE
  const [availableEmployees, setAvailableEmployees] = useState([])//MARK: IMPLEMENT NAME CHANGE
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const navigate = useNavigate()
  const {logoutUser} = useAuth();
  
  useEffect(() => {
    const getDepartment = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(`${DEPARTMENTS_URL}/${id}`, { headers: headers })
        setDepartment(data)
        const {data:employeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(employeesData)
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

    getDepartment()
    
  },[])

  /*
  useEffect(() => {
    setEmployeesNotInDepartment(previousState => previousState.filter(employee => !department.employees?.map(emp=>emp._id).includes(employee._id)))
  },[])
  */
  const updateDepartment = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.put(`${DEPARTMENTS_URL}/${id}`,department, { headers: headers })
    console.log("result",result)
  }

  const deleteDepartment = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.delete(`${DEPARTMENTS_URL}/${id}`,{ headers: headers })
    console.log("result",result)
    navigate('/departments')
  }

  return (
    <div>
        <h1>Edit Department: {department.name}</h1>
        <div>
            Name: <input type="text" name="name" defaultValue={department.name} onChange={e=>setDepartment({...department,name:e.target.value})} /> <br />
            Manager: <select value={department.manager?._id} onChange={e=>setDepartment({...department,manager:e.target.value})}>
            {
              employees
              .map(employee => {
                return (
                  <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName}</option>
                )
              })
            }
            </select> <br />
            <h2>List of Employees</h2>
            <ul>
              {
                department.employees?.map(employee => {
                  return (
                    <li key={employee._id}>{employee._id + ":" + employee.firstName + ' ' + employee.lastName}</li>
                  )
                })
              }
            </ul>
            <select value={selectedEmployee} onChange={e=>setSelectedEmployee(e.target.value)}>
              <option value="" disabled>Select employee to add...</option>
            {
              employees
              .filter(employee => !department.employees?.map(emp=>emp._id).includes(employee._id))              
              .map(employee => {
                return (
                  <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName}</option>
                )
              })
            }
            </select>
            <button type="button" onClick={
              ()=>{
                console.log(selectedEmployee)
                if(!selectedEmployee){
                  return
                }
                setDepartment(prevDepartment => {
                  console.log(prevDepartment)
                  return {
                    ...prevDepartment,
                    employees:
                      [
                        ...prevDepartment.employees,
                        employees.find(emp=>emp._id===selectedEmployee)
                      ]
                  }
              })
              setSelectedEmployee('')
              }}>Add Employee</button>
            <br /><br />

            <button type="button" onClick={updateDepartment}>Update</button>
            <button type="button" onClick={deleteDepartment}>Delete</button> <br />
        </div>
    </div>
  )
}

export default EditDepartment