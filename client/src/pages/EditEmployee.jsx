import React from 'react'

function EditEmployee(id) {
  return (
    <div>
        <h1>
        Edit Employee
        </h1>

        <form action="" method="post">
            <label htmlFor=""></label><input type="text" name="" id="" />
            
            <input type="submit" value="Update" />
            <input type="submit" value="Delete" />
        </form>

        <h2>registered shifts</h2>
        <employeeShifts data={employee.shifts} />
        <shiftsAvailable />
        <button>register a shift</button>
    </div>
  )
}

export default EditEmployee