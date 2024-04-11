import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import Error from "../components/Error"

const SHIFTS_URL = 'http://localhost:3000/shifts'
const EMPLOYEES_URL = 'http://localhost:3000/employees'

function Shifts() {
  const [shifts, setShifts] = useState([])
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getShifts = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data:allShiftsData} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(allShiftsData)
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
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

    getShifts()
    
  },[])

  const handleUpdateClick = () => {}
  const handleCreateClick = () => {}
  const handleAddClick = () => {}
  const handleRemoveClick = () => {}
  const handleToggleClick = () => {}


  return (
    <div>
        <h1>Shifts</h1>
        <ul style={{listStyleType:'none',margin:0,padding:0}}>
          <li>
            <input type="date" placeholder='Date'></input>
            <input type="number" placeholder='Starting Hour'></input>
            <input type="number" placeholder='Ending Hour'></input>
            <button onClick={handleCreateClick()}>Create New Shift</button>
          </li>
        {
          shifts.sort((a, b) => !`${a.date + a.startingHour + a.endingHour}`.localeCompare(b.date + b.startingHour + b.endingHour))
          .map((shift) => {
            return (
            <li key={shift._id}>
              <input type="date" value={shift.date.replace(/T.*Z/g,'')} onChange={()=>{}}></input>
              <input type="number" value={shift.startingHour} onChange={()=>{}} style={{width: '6ch'}}></input>
              <input type="number" value={shift.endingHour} onChange={()=>{}} style={{width: '6ch'}}></input>
              <button onClick={handleToggleClick}>Show Employees List</button>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      shift.assignedEmployees?.map((employee) => {
                        const employeeData = employees.find(e => e._id === employee)
                        return (
                          <tr key={employeeData?._id}>
                            <td>{employeeData?.firstName + ' ' + employeeData?.lastName}</td>
                            <td>{employeeData?.department?.name}</td>
                            <td>
                              <button onClick={() => handleRemoveClick(shift,employeeData._id)}>Remove</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <select>
                  <option value="">Available Employees</option>
                  {
                    employees.filter(employee => !shift.assignedEmployees.includes(employee._id)) //?.map(e => e._id??e)
                    .map(employee => {
                      return (
                        <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName + ' (' + employee.department?.name + ')'}</option>
                      )
                    })
                  }

                </select>
                <button onClick={handleAddClick(shift)}>Add Employee</button>

              </div>
              <button onClick={handleUpdateClick(shift)}>Update</button>
              

              {/* {shift.date?.replace(/T.*Z/g,'')} {shift.startingHour}-{shift.endingHour} */}
            </li>
            )
          })
        }
        </ul>
    </div>
  )
}

export default Shifts