const fs = require('fs');
const connectDB = require('../configs/db');

const shifts = require('../models/shiftsModel');
const employees = require('../models/employeesModel');
const departments = require('../models/departmentsModel');
const users = require('../models/usersModel');

connectDB()

const collectionsMap = {
  departments: {
    'path': './departments.json',
    'model': departments
  },
  employees: {
    'path': './employees.json',
    'model': employees 
  },
  shifts: {
    'path': './shifts.json',
    'model': shifts
  },
  users: {
    'path': './users.json',
    'model': users
  }
}

const createCollection = (filePath, model) => {
  fs.readFile(filePath, 'utf8', (err, jsonString) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);
      console.log(data);
      
      model.insertMany(data)
      .then(function(mongooseDocuments) {
        console.log("inserted",mongooseDocuments)
      })
      .catch(function(err) {
        console.log("error",err)
      });
      
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}

// loading data:
createCollection(collectionsMap['departments'].filePath,collectionsMap['departments'].model)
createCollection(collectionsMap['employees'].filePath,collectionsMap['employees'].model)
createCollection(collectionsMap['shifts'].filePath,collectionsMap['shifts'].model)
createCollection(collectionsMap['users'].filePath,collectionsMap['users'].model)