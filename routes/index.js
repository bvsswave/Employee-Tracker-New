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