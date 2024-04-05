import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EMPLOYEES_URL = 'http://localhost:3000/employees'

function Employees() {

  useEffect(() => {
    
  },[])

  return (
    <div>
        <h1>
            Employees
        </h1>
        <Link to="add">Add Employee</Link> <br />
        Filter By:
        <select name="" id="">
        {
            departments.map(department => {
                return (
                    <option value={department.id}>{department.name}</option>
                )
            })
        }
        </select> <br />
        <table>
            {
                data.map((employee) => {
                    return (
                        <tr>
                        <Link to={`/employees/${employee.id}/edit`}>{employee.fullName}</Link>
                        <Link to={`/departments/${employee.department.id}/edit`}>{employee.department}</Link>
                        <employeeShifts data={employee.shifts} />
                        {/* date & time */}
                        </tr>
                    )
                })
            }
        </table>
    </div>
  )
}

export default Employees