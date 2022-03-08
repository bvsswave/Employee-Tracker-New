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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Quit']
        }
    ])



    if (question.trackerAction === 'View all departments') {
        viewDepartments();

    }
     if (question.trackerAction === "View all roles") {
        viewRoles();
        
    }

    if (question.trackerAction === "View all employees") {
        viewEmployees();
       
    }
