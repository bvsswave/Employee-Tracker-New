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

        if (updatedEmployeeRole) {
            updatedRole.push(updatedEmployeeRole);
            
        }
        
        updateEmployeeRole();

    }
    if (question.trackerAction === 'Quit') {
        console.log("Bye! (CTRL + C to quit");
        return;
    }
    startQuestions();
};
const viewDepartments = () => {
    departments = [];

    db.query(`SELECT * FROM department`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++){
            departments.push(row[i]);
        }
        console.table('', departments);
        console.log('Press arrow down to execute another action');
    })
};
const viewRoles = () => {

    roles = [];

    db.query(`SELECT * FROM employeerole`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let j = 0; j < row.length; j++) {
            roles.push(row[j]);
        }
        console.table('', roles);
        console.log('Press arrow down to execute another action');
    })

};
const viewEmployees = () => {
    employees = [];
    db.query(`SELECT employee.*, department.department_name AS department, employeerole.title AS role
    from employee
    LEFT JOIN department
    ON employee.department_id = department.id
    LEFT JOIN employeerole
    ON employee.role_id = employeerole.id`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let k = 0; k < row.length; k++) {
            employees.push(row[k]);
        }
        
        console.table('', employees);
        console.log('Press arrow down to execute another action');
    })
};
const addRole = () => {


    const params = [roles[roles.length-1].newRoleTitle, roles[roles.length-1].newRoleSalary, roles[roles.length-1].departmentID];

    db.query(`INSERT INTO employeerole (title, salary, department_id)
    VALUES (?, ?, ?)`, params, (err, res) => {
        if (err) {

            return;
        }

    });
    console.log('Role is now added!')
    console.log('Press arrow down to execute another action');
};

const addEmployee = () => {

    const params = [employees[employees.length-1].newEmployeeFirstName, employees[employees.length-1].newEmployeeLastName, employees[employees.length-1].roleID, employees[employees.length-1].managerName, employees[employees.length-1].departmentID];
    
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_name, department_id)
    VALUES (?, ?, ?, ?, ?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }


        console.log('', "The employee is now added")
        console.log("Press arrow down to execute another action");

    });

};
const addDepartment = () => {
    const params = [departments[departments.length-1].newDepartment];
    
    db.query(`INSERT INTO department (department_name)
    VALUES (?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("The department is now added")
        console.log("Press arrow down to execute another action");
    });
};

const updateEmployeeRole = () => {
    
    const params = [updatedRole[0].newRoleID, updatedRole[0].employeeFirstName, updatedRole[0].employeeLastName];
   
    db.query(`UPDATE employee set role_id = ?
    WHERE first_name = ? and last_name = ?`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Employee is now updated")
        console.log("Press arrow down to execute another action");
    });


}

startQuestions();


