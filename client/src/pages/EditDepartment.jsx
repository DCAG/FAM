import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const EMPLOYEES_URL = 'http://localhost:3000/employees'
const DEPARTMENTS_URL = 'http://localhost:3000/departments'

function EditDepartment() {
  const {id} = useParams()
  const [department, setDepartment] = useState({})
  const [members, setMembers] = useState([])
  const [outsiders, setOutsiders] = useState([])
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const navigate = useNavigate()
  const {logoutUser} = useAuth();
  
  useEffect(() => {
    const getDepartment = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data:departmentData} = await axios.get(`${DEPARTMENTS_URL}/${id}`, { headers: headers })
        setDepartment(departmentData)
        setMembers(departmentData.employees)
        const {data:allEmployeesData} = await axios.get(EMPLOYEES_URL, { headers: headers })
        setEmployees(allEmployeesData)
        setOutsiders(allEmployeesData.filter(employee => !departmentData.employees.map(e => e._id).includes(employee._id)))
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
    
  },[])

  useEffect(() => {
    if (outsiders.length > 0) {
      setSelectedEmployee(outsiders[0]._id);
    } else {
      setSelectedEmployee('');
    }
  }, [outsiders])

  const handleAddClick = () => {  
    if(selectedEmployee){ 
      // add to members
      setMembers(prev => [
            ...prev,
            outsiders.find(out => out._id === selectedEmployee)
      ])
      // remove from outsiders
      setOutsiders(prev => prev.filter(outsider => outsider._id !== selectedEmployee))
    }
  }

  const handleRemoveClick = (value) => {
    // Add back to outsiders
    setOutsiders(prev => [...prev, members.find(member => member._id===value)].sort((a,b)=>{return a._id.localeCompare(b._id)})); // Assuming the initial values were sorted
    // Remove from members
    setMembers(prev => prev.filter(member => member._id !== value));
  }

  const handleUpdateClick = async () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    const result = await axios.put(`${DEPARTMENTS_URL}/${id}`,{...department,employees:members}, { headers: headers })
    console.log("result",result)
  }

  const handleDeleteClick = async () => {
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
              <option value={''}>Select a manager...</option>
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
            <h2>List of Employees</h2>
            <ul>
              {
                members.map(employee => {
                  return (
                    <li key={employee._id}>
                      {employee.firstName + ' ' + employee.lastName}
                      <button onClick={() => handleRemoveClick(employee._id)}>Remove</button>
                    </li>
                  )
                })
              }
            </ul>
            <select value={selectedEmployee} onChange={e=>setSelectedEmployee(e.target.value)}>
              {/* <option value="" disabled>Select employee to add...</option> */}
              {          
                outsiders
                .map(employee => {
                  return (
                    <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName}</option>
                  )
                })
              }
            </select>
            <button type="button" onClick={handleAddClick}>Add Employee</button>
            <br /><br />

            <button type="button" onClick={handleUpdateClick}>Update</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button> <br />
        </div>
    </div>
  )
}

export default EditDepartment