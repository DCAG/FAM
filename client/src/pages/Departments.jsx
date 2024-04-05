import React from 'react'

function Departments() {
  return (
    <div>
        <h1>
        Departments
        </h1>

        <Link to='add'>New Department</Link> <br />
        <table>
            {
                departments.maps(department => {
                    <Link to={`${department.id}/edit`}>{department.name}</Link>
                    {department.managerName}
                    <EmployeesList data={department.employees} />
                    {/*employee full name - link to employees/:id/edit*/}
                })
            }
        </table>
    </div>
  )
}

export default Departments