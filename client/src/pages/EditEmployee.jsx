import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'
const SHIFTS_URL = 'http://localhost:3000/shifts'

function EditEmployee() {

  const {id: paramsId} = useParams()
  const [employee, setEmployee] = useState({})
  const [departments, setDepartments] = useState([])
  const [shifts, setShifts] = useState([])
  const [assignedShifts, setAssignedShifts] = useState([])
  const [unassignedShifts, setUnassignedShifts] = useState([])
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
        setShifts(allShiftsData.sort((a, b) => `${a.date + a.startingHour + a.endingHour}`.localeCompare(b.date + b.startingHour + b.endingHour)))
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

  useEffect(() => {
    if(selectedShift === ''){
      setAssignedShifts(shifts
        .filter(shift => shift.assignedEmployees.includes(paramsId)))
      setUnassignedShifts(shifts
        .filter(shift => !shift.assignedEmployees.includes(paramsId)))
    }
  },[shifts, selectedShift])

  const handleAddClick = async () => {  
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const index = shifts.findIndex(shift=>shift._id === selectedShift)
    shifts[index].assignedEmployees.push(paramsId) //= [...shifts[index].assignedEmployees,employee] .filter(employee => employee._id !== paramsId)
    const result = await axios.put(`${SHIFTS_URL}/${selectedShift}`, shifts[index], { headers: headers })
    console.log("result",result)
    setSelectedShift('')
  }

  const handleUpdateClick = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.put(`${EMPLOYEES_URL}/${paramsId}`, employee, { headers: headers })
    console.log("result",result)
  }

  const handleDeleteClick = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.delete(`${EMPLOYEES_URL}/${paramsId}`,{ headers: headers })
    console.log("result",result)
    navigate('/employees')
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
          <option value="" disabled>Select a department...</option>
          {
            departments
            ?.map(department => {
              return (
                <option key={department._id} value={department._id}>{department.name}</option>
              )
            })
          }
        </select>
        <br />
        <br />            
        <button type="button" onClick={handleUpdateClick}>Update</button>
        <button type="button" onClick={handleDeleteClick}>Delete</button>
        <br />            

        <h2>Registered Shifts</h2>
        <ul>
        {
          assignedShifts
          .map(shift => {
            return (
              <li key={shift._id}>
                {shift.date?.replace(/T.*Z/g,'') +' '+ shift.startingHour +'-'+ shift.endingHour}
              </li>
            )
          })
        }
        </ul>

        <select value={selectedShift} onChange={e=>setSelectedShift(e.target.value)}>
          <option value='' disabled>Select a shift...</option>
          {
            unassignedShifts
            .map(shift => {
              return (
                <option key={shift._id} value={shift._id}>
                  {shift.date?.replace(/T.*Z/g,'') +' '+ shift.startingHour +'-'+ shift.endingHour}
                </option>
              )
            })
          }
        </select>
        <button type="button" onClick={handleAddClick}>Register</button>
    </div>
  )
}

export default EditEmployee