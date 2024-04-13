const departmentsRepo = require('../repositories/departmentsRepo')
const employeesService = require('./employeesService')

const getAll = () => {
    return departmentsRepo.getAll()
}

const getById = (id) => {
    return departmentsRepo.getById(id)
}

const update = (id,department) => {
    return departmentsRepo.update(id,department)
}

const create = (department) => {
    return departmentsRepo.create(department)
}

const remove = async (id) => {
    // REQUIREMENT: A "Delete" button to delete all departments data from the server
    // (including all department's employees data)
    
    // Step 1: find all employees of THIS department
    const department = await getById(id)
    department.employees?.forEach(async (employee) => {
      //Step 2: remove the employee and remove them from all shifts they are registered to.
      return employeesService.remove(employee._id)
    })
    //Step 3: remove the department
    return departmentsRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}