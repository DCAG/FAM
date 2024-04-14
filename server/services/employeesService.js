const employeesRepo = require('../repositories/employeesRepo')
const shiftsRepo = require('../repositories/shiftsRepo')

const getAll = () => {
    return employeesRepo.getAll()
}

const getById = (id) => {
    return employeesRepo.getById(id)
}

const update = (id,employee) => {
    return employeesRepo.update(id,employee)
}

const create = (employee) => {
    return employeesRepo.create(employee)
}

const remove = async (id) => {
    //REQUIREMENT: A “Delete” button to delete all employee’s data
    // (and his related data, like shifts) from the server.

    // future: consider removing references to employee from all departments they manage

    //Step 1: find all shifts THIS employee is assigned to
    const employee = await employeesRepo.getById(id)
    const employeeShifts = employee.shifts
    employeeShifts.forEach(async (shift) => {
      //Step 2: remove the employee from shifts   
      const updatedEmployees = shift.employees.filter(employee => employee.toString() !== id)
      const updatedShift = {...shift, employees:updatedEmployees}
      await shiftsRepo.update(shift._id,updatedShift)
    })
    //Step 3: remove the employee
    return employeesRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}