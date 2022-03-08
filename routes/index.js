const inquirer = require('inquirer');
const cTable = require('console.table');
const { express } = require('express');
const db = require('../db/connection');


let departments = [];
let roles = [];
let employees = [];
let updatedRole = [];
console.log("************ Employee Tracker ************")

async function startQuestions() {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: 'trackerAction',
            message: "Where to now?",
            choices: ['Display all departments', 'Display all roles', 'Display all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Quit']
        }
    ])



    if (question.trackerAction === 'Display all departments') {
        viewDepartments();

    }
     if (question.trackerAction === "Display all roles") {
        viewRoles();
        
    }

    if (question.trackerAction === "Display all employees") {
        viewEmployees();
       
    }

    let newRole
    if (question.trackerAction === "Add a role") {
        newRole = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: "Enter title of new role",
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log("Please enter title of new role")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: "How much is the salary for the new role?",
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log("Please enter a salary for the new role.")
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentID',
                message: "Which departmnet will the new role be in?",
                choices: ['1', '2', '3', '4']
            }

        ])

        // Pushing the array to addRole
        if (newRole) {
            roles.push(newRole)
        }

        addRole();
        
    }

    if (question.trackerAction === "Add an employee") {
        
        newEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: "What is the first name of your new employee?",
                validate: newEmployeeFirstName => {
                    if (newEmployeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter the first name of the employee.")
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the employee's role id? (Required)",
                validate: roleID => {
                    if (roleID) {
                        return true;
                    } else {
                        console.log("Please enter the role ID!")
                    }
                }
            },
            {
                type: 'input',
                name: 'managerName',
                message: "What is the name of the Manager?",
                validate: managerName => {
                    if (managerName) {
                        return true;
                    } else {
                        console.log("Please enter the name of the Manager")
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentID',
                message: "What is the department ID for this employee?",
                validate: departmentID => {
                    if (departmentID) {
                        return true;
                    } else {
                        console.log("Please enter a department ID!")
                    }
                }
            }
        ])
        if (newEmployee) {

            employees.push(newEmployee);
            
        }

        addEmployee();

    }
    if (question.trackerAction === 'Add a Department') {
        newDepartment = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: "What is the Department name? (Required)",
                validate: newDepartment => {
                    if (newDepartment) {
                        return true;
                    } else {
                        console.log("Please enter the department name")
                    }
                }
            }
        ])
        if (newDepartment) {

            departments.push(newDepartment);
            
        }
        addDepartment();
       
    }
    if (question.trackerAction === "Update employee's role") {
        
        updatedEmployeeRole = await inquirer.prompt([ 
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "Please enter the first name of the employee you're updating",
                validate: employeeFirstName => {
                    if (employeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: "Please enter the last name of the employee you're updating",
                validate: employeeLastName => {
                    if (employeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleID',
                message: "Enter the new role id for this employee",
                validate: newRoleID => {
                    if (newRoleID) {
                        return true;
                    } else {
                        console.log("Please enter the new role ID for this employee!")
                    }
                }
            }
        ])
