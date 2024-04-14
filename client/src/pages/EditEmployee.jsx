import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getHeaders } from '../utils/utils'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'
const SHIFTS_URL = 'http://localhost:3000/shifts'

function EditEmployee() {
  // THIS employee
  const {id: employeeId} = useParams()
  const [employee, setEmployee] = useState({firstName: '', lastName: '', startWorkYear: '', department: ''})
  // list of all departments to select for assigning the employee or changing their assignment.
  const [departments, setDepartments] = useState([])
  // list of all shifts to register to. The selected shift document is updated with THIS employee.
  const [shifts, setShifts] = useState([])
  const [assignedShifts, setAssignedShifts] = useState([])
  const [unassignedShifts, setUnassignedShifts] = useState([])
  const [selectedShift, setSelectedShift] = useState('')

  const shiftsComparer = (a, b) => ('' + a.date + a.startingHour + a.endingHour).localeCompare('' + b.date + b.startingHour + b.endingHour)
  
  const navigate = useNavigate()
  const {logoutUser} = useAuth()
  
  useEffect(() => {
    const getEmployee = async () => {
      const headers = getHeaders()
      try{
        const {data:employeeData} = await axios.get(`${EMPLOYEES_URL}/${employeeId}`, { headers: headers })
        setEmployee(employeeData)
        
        const {data:allDepartmentsData} = await axios.get(DEPARTMENTS_URL, { headers: headers })
        setDepartments(allDepartmentsData)
        
        const {data:allShiftsData} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(allShiftsData.sort(shiftsComparer))
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          localStorage['lastError'] = error?.response?.data?.message  
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
      const filteredAssignedShifts = shifts.filter(shift => shift.employees.some(e => e._id == employeeId))
      setAssignedShifts(filteredAssignedShifts)
      const filteredUnassignedShifts = shifts.filter(shift => !shift.employees.some(e => e._id == employeeId))
      setUnassignedShifts(filteredUnassignedShifts)
    }
  },[shifts, selectedShift])

  // add shift to an employee
  const handleAddClick = async () => {  
    if(selectedShift === ''){
      console.log('Select a shift before clicking on \"Register\"')
      return
    }

    try{
      const headers = getHeaders()
      const index = shifts.findIndex(shift=>shift._id === selectedShift)
      shifts[index].employees.push(employee) // push(employeeId) would work as well
      const result = await axios.put(`${SHIFTS_URL}/${selectedShift}`, shifts[index], { headers: headers })
      console.log("result",result)
      // triggers useEffect block
      setSelectedShift('')
    }
    catch(err){
      console.log(err)
    }
  }

  // update employee
  const handleUpdateClick = async () => {
    const headers = getHeaders()
    const result = await axios.put(`${EMPLOYEES_URL}/${employeeId}`, employee, { headers: headers })
    console.log("result",result)
  }

  // delete employee
  const handleDeleteClick = async () => {
    const headers = getHeaders()
    const result = await axios.delete(`${EMPLOYEES_URL}/${employeeId}`,{ headers: headers })
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
          ?.map(shift => {
            return (
              <li key={shift._id}>
                {shift.date +' '+ shift.startingHour +'-'+ shift.endingHour}
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
                  {shift.date +' '+ shift.startingHour +'-'+ shift.endingHour}
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