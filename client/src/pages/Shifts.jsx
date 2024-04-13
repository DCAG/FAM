import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import ShiftListItemComponent from '../components/ShiftListItemComponent'
import { getHeaders } from '../utils/utils'

const SHIFTS_URL = 'http://localhost:3000/shifts'
const SHIFT_CREATE_URL = 'http://localhost:3000/shifts/create'
const EMPLOYEES_URL = 'http://localhost:3000/employees'

function Shifts() {
  const [shifts, setShifts] = useState([])
  const [employees, setEmployees] = useState([])
  const [newShift, setNewShift] = useState({date: '', startingHour: '', endingHour: '', employees: []})
  
  const navigate = useNavigate()
  const {logoutUser} = useAuth()

  useEffect(() => {
    const getShifts = async () => {
      const headers = getHeaders()
      try{
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
        const {data:allShiftsData} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(allShiftsData)
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

    getShifts()
    
  },[newShift])

  const handleCreateClick = async (shift) => {
    const headers = getHeaders()
    const {data} = await axios.post(SHIFT_CREATE_URL, shift, { headers: headers })
    console.log(data)
    setNewShift({date: '', startingHour: '', endingHour: ''})
  }

  const childCallback = async (shift) => {
    const headers = getHeaders()
    const {data} = await axios.put(`${SHIFTS_URL}/${shift._id}`, shift, { headers: headers })
    console.log(data)
  }

  // this comparer is in reverse to the one defined in Employees(.jsx) page
  const shiftComparer = (b, a) => ('' + a.date + a.startingHour + a.endingHour).localeCompare('' + b.date + b.startingHour + b.endingHour)

  return (
    <div>
        <h1>Shifts</h1>
        <ul style={{listStyleType:'none',margin:0,padding:0}}>
          <li>
            <ShiftListItemComponent shift={newShift} callback={handleCreateClick} />
          </li>
        {
          shifts.sort(shiftComparer)
          .map((shift) => {
            return (
            <li key={shift._id}>
              <ShiftListItemComponent shift={shift}
                assignedEmployees={
                  shift.employees?.map((employee) => {return employees.find(e => e._id === employee._id)})
                }
                unassignedEmployees={
                  employees.filter(employee => !shift.employees?.some(e=>e.id === employee._id))
                }
                callback={childCallback}
              />
            </li>
            )
          })
        }
        </ul>
    </div>
  )
}

export default Shifts