import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'
const SHIFTS_URL = 'http://localhost:3000/shifts'

function EditEmployee() {

  const {id: paramsId} = useParams()
  const [employee, setEmployee] = useState([])
  const [departments, setDepartments] = useState({})
  const [shifts, setShifts] = useState([])
  const [selectedShift, setSelectedShift] = useState('')
  
  const navigate = useNavigate()
  const {logoutUser} = useAuth()
  
  useEffect(() => {
    const getEmployee = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data:employeeData} = await axios.get(`${EMPLOYEES_URL}/${paramsId}`, { headers: headers })
        setEmployee(employeeData)
        const {data:allDepartmentsData} = await axios.get(DEPARTMENTS_URL, { headers: headers })
        setDepartments(allDepartmentsData)
        const {data:allShiftsData} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(allShiftsData)
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

    getEmployee()
    
  },[])

  const handleAddClick = async () => {  
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const index = employees.findIndex(employee=>employee._id === selectedEmployee)
    employees[index].department = paramsId
    const result = await axios.put(`${EMPLOYEES_URL}/${selectedEmployee}`, employees[index], { headers: headers })
    console.log("result",result)
    //TODO: make the employees render the page again
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
        <h1>
        Edit Employee
        </h1>

        First Name: <input type="text" name="firstName" value={employee.firstName} onChange={e=>setEmployee({...employee,firstName:e.target.value})} /> <br />
        Last Name: <input type="text" name="lastName" value={employee.lastName} onChange={e=>setEmployee({...employee,lastName:e.target.value})} /> <br />
        Start Work Year: <input type="number" name="startWorkYear" value={employee.startWorkYear} onChange={e=>setEmployee({...employee,startWorkYear:e.target.value})} /> <br />
        Department: <select value={employee.department?._id??(employee.department??'')} onChange={e=>setEmployee({...employee,department:e.target.value})}>
        <option value='' disabled>Select a department...</option>
          {
            // departments
            // ?.map(department => {
            //   return (
            //     <option key={department._id} value={department._id}>{department.name}</option>
            //   )
            // })
          }
        </select>
        <br />
        <br />            
        <button type="button">Update</button>
        <button type="button">Delete</button>

        <h2>registered shifts</h2>
        {/* <employeeShifts data={employee.shifts} />
        <shiftsAvailable /> */}
        <button>Add</button>
    </div>
  )
}

export default EditEmployee