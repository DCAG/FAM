import React,{useEffect, useState} from 'react'

function ShiftListItemComponent(props) { // props: {shift, assignedEmployees, unassignedEmployees, callback}
  const [shiftItem, setShiftItem] = useState({date: '', startingHour: '', endingHour: '', assignedEmployees:[]})
  const [showEmployees, setShowEmployees] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  // fully populated employee objects (including 'department' and 'shifts')
  const [assignedEmployees, setAssignedEmployees] = useState([])
  const [unassignedEmployees, setUnassignedEmployees] = useState([])

  useEffect(() =>{
    setShiftItem(props.shift)
    setAssignedEmployees(props.assignedEmployees)
    setUnassignedEmployees(props.unassignedEmployees)
  },[props])

  const handleShiftItemChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    value = isNaN(value)? value: +value

    setShiftItem(previous => {
      return {
        ...previous,
        [key]:value
      }
    })
  }

  const handleRemoveEmployeeClick = async (employeeId) => {
    const itemToUpdate = {
      ...shiftItem,
      employees: shiftItem.employees.filter(
        // each item in the array shift.employees can be either an object or string of an id
        employee => (employee._id??employee) !== employeeId)
    } 
    setShiftItem(itemToUpdate)
    await props.callback(itemToUpdate)
    // find employee in assigned group
    // remove employee from assigned
    // add employee to Unassigned
    const employeeData = assignedEmployees.find(employee => employee._id === employeeId)
    setAssignedEmployees(previous => previous.filter(employee => employee._id !== employeeId))
    setUnassignedEmployees(previous => [...previous, employeeData])
  }

  const handleAddEmployeeClick = async () => {
    if(selectedEmployee===''){
      console.log('Select employee from the drop down list before clicking on \"Add Employee\"')
      return
    }

    const itemToUpdate = {
      ...shiftItem,
      employees: [...shiftItem.employees, selectedEmployee /* id */]
    } 
    setShiftItem(itemToUpdate)
    await props.callback(itemToUpdate)
    // find employee in Unassigned group
    // add employee to assigned
    // remove employee from unassigned
    const employeeData = unassignedEmployees.find(item => item._id === selectedEmployee)
    setAssignedEmployees(previous => [...previous,employeeData])
    setUnassignedEmployees(previous => previous.filter(employee=>employee._id!==selectedEmployee))
    // reset selectedEmployee state
    setSelectedEmployee('')
  }

  const handleUpdateClick = async () => {
    await props.callback(shiftItem)
  }

  const handleToggleClick = () => {
    setShowEmployees(previous => !previous)
  }

  return (
    <div>
      <input type="date" name='date' value={shiftItem.date} onChange={handleShiftItemChange}></input>
      <input type="number" name='startingHour' value={shiftItem.startingHour} onChange={handleShiftItemChange} style={{width: '6ch'}}></input>
      <input type="number" name='endingHour' value={shiftItem.endingHour} onChange={handleShiftItemChange} style={{width: '6ch'}}></input>
      <button onClick={handleUpdateClick}>{!shiftItem._id?'Create':'Update'}</button>

      <button onClick={handleToggleClick} disabled={!shiftItem._id}>{!showEmployees?'Show':'Hide'} Employees List ({assignedEmployees?.length??0})</button>
      <div style={!showEmployees?{display:'none'}:{}}>
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
              assignedEmployees?.map((employee, index) => {
                return (
                  <tr key={index}>
                    <td>{employee?.firstName + ' ' + employee?.lastName}</td>
                    <td>{employee?.department?.name}</td>
                    <td>
                      <button onClick={() => handleRemoveEmployeeClick(employee?._id)}>Remove</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <select value={selectedEmployee} onChange={e=>setSelectedEmployee(e.target.value)}>
          <option value="" disabled>Available Employees</option>
          {
            unassignedEmployees?.map(employee => {
              return (
                <option key={employee._id} value={employee._id}>{employee.firstName + ' ' + employee.lastName + ' (' + employee.department?.name + ')'}</option>
              )
            })
          }

        </select>
        <button onClick={handleAddEmployeeClick}>Add Employee</button>
      </div>
    </div>
  )
}

export default ShiftListItemComponent