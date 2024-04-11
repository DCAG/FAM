const employeesRepo = require('../repositories/employeesRepo')

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
    //REQUIREMENT: A “Delete” button to delete all employee’s data (and his related data, like shifts) from the server.
    //Step 1: find all shifts THIS employee is assigned to
    const allShifts = await shiftsRepo.getAll()
    const employeeShifts = allShifts.filter(shift => shift.assignedEmployees.include(id))
    employeeShifts.forEach(async (shift) => {
      //Step 2: remove the employee from shifts   
      shift.assignedEmployees = shift.assignedEmployees.filter(employee => employee !== id)
      await shiftsRepo.update(shift._id,shift) //shift.save()
    })
    //Step 3: remove the employee
    return employeesRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}