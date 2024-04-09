const departmentsRepo = require('../repositories/departmentsRepo')
const employeesRepo = require('../repositories/employeesRepo')

const getAll = () => {
    return departmentsRepo.getAll()
}

const getById = (id) => {
    return departmentsRepo.getById(id)
}

/* MODIFICATION SUGGESTION:
  departments will always pull all employees data and display only those that match the selected department
  you are pulling this data anyway for the form options!
  update the DB so that the A department document will NOT contain a list of employees (only the employees will)
*/
const update = (id,department) => {
    return departmentsRepo.update(id,department)
}

const create = (department) => {
    return departmentsRepo.create(department)
}

const remove = async (id) => {
    //REQUIREMENT: A "Delete" button to delete all departments data from the server (including all department's employees data)
    //Step 1: find all employees of THIS department
    const departmentEmployees = await employeesRepo.getByDepartmentId(id)
    departmentEmployees.forEach(async (employee) => {
      /* OPTIONAL
      //Step 2: for each employee, find the departments they manage (can be 0, 1 or more)
      const managedDepartments = await departmentsRepo.getByManager(employee._id)
      managedDepartments.foreach(innerDepartment => {
        //Step 3: update each department to remove its manager
        return departmentsRepo.update(innerDepartment._id,{...innerDepartment, manager: ''})
      })
      */
      //Step ?: remove employee shifts...
      //Step 4: remove the employee
      return employeesRepo.remove(employee._id)
    })
    //Step 5: remove the department
    return departmentsRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}