
const inputCheck = require('.utils/inputCheck');
const db = require('./db/connection');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API

app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Successful!',
            data: row
        });
    });
});


// Department


app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `Insert Into department (department_name)
                    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message });
            return;
        }
        res.json({
            message: 'SUCCESFUL!',
            data: body
        });
    });
});

// Picking roles

app.get('/api/employeerole', (req, res) => {
    const sql = `SELECT * FROM employeerole`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Successful!',
            data: row
        });
    });
});


// Adding new role
app.post('/api/employeerole', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }


    const sql = `INSERT INTO employeerole (title, salary, department_id)
                    VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Succesful!',
            data: body
        });
    });
  });

  
// Employees


app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Successful!',
            data: row
        });
    });
});


// New Employee

app.post('/api/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_name)
                    VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_name];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Successful!',
            data: body
        });
    });
  });


//   Setting role for employee

app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });


      } else if (!result.affectedRows) {
        res.json({
          message: 'That Employee is not found!'
        });
      } else {
        res.json({
          message: 'Successful!',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// connection.connect((error) => {
//     if (error) throw error;
//     console.log(chalk.yellow.bold(`====================================================================================`));
//     console.log(``);
//     console.log(chalk.greenBright.bold(figlet.textSync('Employee-Tracker')));
//     console.log(``);
//     console.log(`                                                          ` + chalk.greenBright.bold('Created By: Tanner Shahan'));
//     console.log(``);
//     console.log(chalk.orange.bold(`====================================================================================`));
//     promptUser();
//   });
//   const promptUser = () => {
//     inquirer.prompt([

//         // Choices
//         {
//           name: 'choices',
//           type: 'list',
//           message: 'Select an option:',
//           choices: [
//             'View Employees',
//             'View Roles',
//             'View Departments',
//             'View Employees By Department',
//             'View Department Budgets',
//             'Update Employee Role',
//             'Update Employee Manager',
//             'Add Employee',
//             'Add Role',
//             'Add Department',
//             'Remove Employee',
//             'Remove Role',
//             'Remove Department',
//             'Exit'
//             ]
//         }
//       ])
//       .then((answers) => {
//         const {choices} = answers;
//           if (choices === 'View Employees') {
//               viewAllEmployees();
//           }
//           if (choices === 'View Departments') {
//             viewAllDepartments();
//         }
//           if (choices === 'View Employees By Department') {
//               viewEmployeesByDepartment();
//           }
//           if (choices === 'Add Employee') {
//               addEmployee();
//           }
//           if (choices === 'Remove Employee') {
//               removeEmployee();
//           }
//           if (choices === 'Update Employee Role') {
//               updateEmployeeRole();
//           }
//           if (choices === 'Update Employee Manager') {
//               updateEmployeeManager();
//           }
//           if (choices === 'View Roles') {
//               viewAllRoles();
//           }
//           if (choices === 'Add Role') {
//               addRole();
//           }
//           if (choices === 'Remove Role') {
//               removeRole();
//           }
//           if (choices === 'Add Department') {
//               addDepartment();
//           }
//           if (choices === 'View Department Budgets') {
//               viewDepartmentBudget();
//           }
//           if (choices === 'Remove Department') {
//               removeDepartment();
//           }
//           if (choices === 'Exit') {
//               connection.end();
//           }
//     });
//   };
//   const viewAllEmployees = () => {
//     let sql =       `SELECT employee.id, 
//                     employee.first_name, 
//                     employee.last_name, 
//                     role.title, 
//                     department.department_name AS 'department', 
//                     role.salary
//                     FROM employee, role, department 
//                     WHERE department.id = role.department_id 
//                     AND role.id = employee.role_id
//                     ORDER BY employee.id ASC`;
//     connection.promise().query(sql, (error, response) => {
//       if (error) throw error;
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       console.log(`                              ` + chalk.orange.bold(`Current Employees:`));
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       console.table(response);
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       promptUser();
//     });
//   };
//   const viewAllRoles = () => {
//     console.log(chalk.yellow.bold(`====================================================================================`));
//     console.log(`                              ` + chalk.orange.bold(`Current Employee Roles:`));
//     console.log(chalk.yellow.bold(`====================================================================================`));
//     const sql =     `SELECT role.id, role.title, department.department_name AS department
//                     FROM role
//                     INNER JOIN department ON role.department_id = department.id`;
//     connection.promise().query(sql, (error, response) => {
//       if (error) throw error;
//         response.forEach((role) => {console.log(role.title);});
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
//     });
//   };
// //   Departments
//   const viewAllDepartments = () => {
//     const sql =   `SELECT department.id AS id, department.department_name AS department FROM department`; 
//     connection.promise().query(sql, (error, response) => {
//       if (error) throw error;
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       console.log(`                              ` + chalk.green.bold(`All Departments:`));
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       console.table(response);
//       console.log(chalk.yellow.bold(`====================================================================================`));
//       promptUser();
//     });
//   };
  
//   // Employees in the Department
  
//   const viewEmployeesByDepartment = () => {
//     const sql =     `SELECT employee.first_name, 
//                     employee.last_name, 
//                     department.department_name AS department
//                     FROM employee 
//                     LEFT JOIN role ON employee.role_id = role.id 
//                     LEFT JOIN department ON role.department_id = department.id`;
//     connection.query(sql, (error, response) => {
//       if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.table(response);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
//       });
//   };
//   // Department Budgets

//   const viewDepartmentBudget = () => {
//     console.log(chalk.yellow.bold(`====================================================================================`));
//     console.log(`                              ` + chalk.green.bold(`Budget By Department:`));
//     console.log(chalk.yellow.bold(`====================================================================================`));
//     const sql =     `SELECT department_id AS id, 
//                     department.department_name AS department,
//                     SUM(salary) AS budget
//                     FROM  role  
//                     INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
//     connection.query(sql, (error, response) => {
//       if (error) throw error;
//         console.table(response);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
//     });
//   };
//   // Adding employee
//   const addEmployee = () => {
//     inquirer.prompt([
//       {
//         type: 'input',
//         name: 'fistName',
//         message: "ENTER EMPLOYEE'S FIRST NAME",
//         validate: addFirstName => {
//           if (addFirstName) {
//               return true;
//           } else {
//               console.log('Please enter FIRST NAME');
//               return false;
//           }
//         }
//       },
//       {
//         type: 'input',
//         name: 'lastName',
//         message: "ENTER EMPLOYEE'S LAST NAME",
//         validate: addLastName => {
//           if (addLastName) {
//               return true;
//           } else {
//               console.log('Please enter last name');
//               return false;
//           }
//         }
//       }
//     ])
//       .then(answer => {
//       const crit = [answer.fistName, answer.lastName]
//       const roleSql = `SELECT role.id, role.title FROM role`;
//       connection.promise().query(roleSql, (error, data) => {
//         if (error) throw error; 
//         const roles = data.map(({ id, title }) => ({ name: title, value: id }));
//         inquirer.prompt([
//               {
//                 type: 'list',
//                 name: 'role',
//                 message: "ENTER EMPLOYEE'S ROLE",
//                 choices: roles
//               }
//             ])
//               .then(roleChoice => {
//                 const role = roleChoice.role;
//                 crit.push(role);
//                 const managerSql =  `SELECT * FROM employee`;
//                 connection.promise().query(managerSql, (error, data) => {
//                   if (error) throw error;
//                   const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
//                   inquirer.prompt([
//                     {
//                       type: 'list',
//                       name: 'manager',
//                       message: "ENTER EMPLOYEE'S MANAGER",
//                       choices: managers
//                     }
//                   ])
//                     .then(managerChoice => {
//                       const manager = managerChoice.manager;
//                       crit.push(manager);
//                       const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                                     VALUES (?, ?, ?, ?)`;
//                       connection.query(sql, crit, (error) => {
//                       if (error) throw error;
//                       console.log("New employee has been created")
//                       viewAllEmployees();
//                 });
//               });
//             });
//           });
//        });
//     });
//   };
//   const addRole = () => {
//     const sql = 'SELECT * FROM department'
//     connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let deptNamesArray = [];
//         response.forEach((department) => {deptNamesArray.push(department.department_name);});
//         deptNamesArray.push('Create Department');
//         inquirer
//           .prompt([
//             {
//               name: 'departmentName',
//               type: 'list',
//               message: 'ENTER DEPARTMENT FOR NEW ROLE',
//               choices: deptNamesArray
//             }
//           ])
//           .then((answer) => {
//             if (answer.departmentName === 'Create Department') {
//               this.addDepartment();
//             } else {
//               addRoleResume(answer);
//             }
//           });
  
//         const addRoleResume = (departmentData) => {
//           inquirer
//             .prompt([
//               {
//                 name: 'newRole',
//                 type: 'input',
//                 message: 'ENTER NAME OF NEW ROLE',
//                 validate: validate.validateString
//               },
//               {
//                 name: 'salary',
//                 type: 'input',
//                 message: 'ENTER SALARY OF NEW ROLE',
//                 validate: validate.validateSalary
//               }
//             ])
//             .then((answer) => {
//               let createdRole = answer.newRole;
//               let departmentId;
  
//               response.forEach((department) => {
//                 if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
//               });
  
//               let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
//               let crit = [createdRole, answer.salary, departmentId];
  
//               connection.promise().query(sql, crit, (error) => {
//                 if (error) throw error;
//                 console.log(chalk.yellow.bold(`====================================================================================`));
//                 console.log(chalk.greenBright(`Role successfully created!`));
//                 console.log(chalk.yellow.bold(`====================================================================================`));
//                 viewAllRoles();
//               });
//             });
//         };
//       });
//     };
//   const addDepartment = () => {
//       inquirer
//         .prompt([
//           {
//             name: 'newDepartment',
//             type: 'input',
//             message: 'ENTER NAME OF NEW DEPARTMENT',
//             validate: validate.validateString
//           }
//         ])
//         .then((answer) => {
//           let sql =     `INSERT INTO department (department_name) VALUES (?)`;
//           connection.query(sql, answer.newDepartment, (error, response) => {
//             if (error) throw error;
//             console.log(``);
//             console.log(chalk.greenBright(answer.newDepartment + ` NEW DEPARTMENT CREATED`));
//             console.log(``);
//             viewAllDepartments();
//           });
//         });
//   };
//   // Update Role
//   const updateEmployeeRole = () => {
//       let sql =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
//                       FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
//       connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
  
//         let sql =     `SELECT role.id, role.title FROM role`;
//         connection.promise().query(sql, (error, response) => {
//           if (error) throw error;
//           let rolesArray = [];
//           response.forEach((role) => {rolesArray.push(role.title);});
  
//           inquirer
//             .prompt([
//               {
//                 name: 'chosenEmployee',
//                 type: 'list',
//                 message: 'ENTER EMPLOYEE FOR NEW ROLE',
//                 choices: employeeNamesArray
//               },
//               {
//                 name: 'chosenRole',
//                 type: 'list',
//                 message: 'ENTER NAME OF NEW ROLE',
//                 choices: rolesArray
//               }
//             ])
//             .then((answer) => {
//               let newTitleId, employeeId;
  
//               response.forEach((role) => {
//                 if (answer.chosenRole === role.title) {
//                   newTitleId = role.id;
//                 }
//               });
  
//               response.forEach((employee) => {
//                 if (
//                   answer.chosenEmployee ===
//                   `${employee.first_name} ${employee.last_name}`
//                 ) {
//                   employeeId = employee.id;
//                 }
//               });
  
//               let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
//               connection.query(
//                 sqls,
//                 [newTitleId, employeeId],
//                 (error) => {
//                   if (error) throw error;
//                   console.log(chalk.greenBright.bold(`====================================================================================`));
//                   console.log(chalk.greenBright(`Employee Role Updated`));
//                   console.log(chalk.greenBright.bold(`====================================================================================`));
//                   promptUser();
//                 }
//               );
//             });
//         });
//       });
//     };


//     // EMPLOYEE MANAGER UPDATE


//   const updateEmployeeManager = () => {
//       let sql =       `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
//                       FROM employee`;
//        connection.promise().query(sql, (error, response) => {
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
  
//         inquirer
//           .prompt([
//             {
//               name: 'chosenEmployee',
//               type: 'list',
//               message: 'ENTER EMPLOYEE WITH NEW MANAGER',
//               choices: employeeNamesArray
//             },
//             {
//               name: 'newManager',
//               type: 'list',
//               message: 'ENTER NAME OF THEIR MANAGER',
//               choices: employeeNamesArray
//             }
//           ])
//           .then((answer) => {
//             let employeeId, managerId;
//             response.forEach((employee) => {
//               if (
//                 answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`
//               ) {
//                 employeeId = employee.id;
//               }
  
//               if (
//                 answer.newManager === `${employee.first_name} ${employee.last_name}`
//               ) {
//                 managerId = employee.id;
//               }
//             });
  
//             if (validate.isSame(answer.chosenEmployee, answer.newManager)) {
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               console.log(chalk.redBright(`Manager Selection Is Invalid`));
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               promptUser();
//             } else {
//               let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
  
//               connection.query(
//                 sql,
//                 [managerId, employeeId],
//                 (error) => {
//                   if (error) throw error;
//                   console.log(chalk.greenBright.bold(`====================================================================================`));
//                   console.log(chalk.greenBright(`Employee Manager Is Now Updated`));
//                   console.log(chalk.greenBright.bold(`====================================================================================`));
//                   promptUser();
//                 }
//               );
//             }
//           });
//       });
//   };

//   // DELETE EMPLOYEE


//   const removeEmployee = () => {
//       let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
  
//       connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
  
//         inquirer
//           .prompt([
//             {
//               name: 'chosenEmployee',
//               type: 'list',
//               message: 'ENTER NAME OF EMPLOYEE YOU WANT TO REMOVE',
//               choices: employeeNamesArray
//             }
//           ])
//           .then((answer) => {
//             let employeeId;
  
//             response.forEach((employee) => {
//               if (
//                 answer.chosenEmployee ===
//                 `${employee.first_name} ${employee.last_name}`
//               ) {
//                 employeeId = employee.id;
//               }
//             });
  
//             let sql = `DELETE FROM employee WHERE employee.id = ?`;
//             connection.query(sql, [employeeId], (error) => {
//               if (error) throw error;
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               console.log(chalk.redBright(`EMPLOYEE HAS BEEN REMOVED`));
//               console.log(chalk.RedBright.bold(`====================================================================================`));
//               viewAllEmployees();
//             });
//           });
//       });
//     };
  

//   // DELETE ROLES


//   const removeRole = () => {
//       let sql = `SELECT role.id, role.title FROM role`;
  
//       connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let roleNamesArray = [];
//         response.forEach((role) => {roleNamesArray.push(role.title);});
  
//         inquirer
//           .prompt([
//             {
//               name: 'chosenRole',
//               type: 'list',
//               message: 'ENTER ROLE YOU WOULD LIKE TO REMOVE',
//               choices: roleNamesArray
//             }
//           ])
//           .then((answer) => {
//             let roleId;
  
//             response.forEach((role) => {
//               if (answer.chosenRole === role.title) {
//                 roleId = role.id;
//               }
//             });
  
//             let sql =   `DELETE FROM role WHERE role.id = ?`;
//             connection.promise().query(sql, [roleId], (error) => {
//               if (error) throw error;
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               console.log(chalk.greenBright(`ROLE HAS BEEN REMOVED`));
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               viewAllRoles();
//             });
//           });
//       });
//     };
  
    
// // DELETE DEPARTMENT



//   const removeDepartment = () => {
//       let sql =   `SELECT department.id, department.department_name FROM department`;
//       connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let departmentNamesArray = [];
//         response.forEach((department) => {departmentNamesArray.push(department.department_name);});
//         inquirer
//           .prompt([
//             {
//               name: 'chosenDept',
//               type: 'list',
//               message: 'ENTER NAME OF DEPARTMENT TO REMOVE',
//               choices: departmentNamesArray
//             }
//           ])
//           .then((answer) => {
//             let departmentId;
  
//             response.forEach((department) => {
//               if (answer.chosenDept === department.department_name) {
//                 departmentId = department.id;
//               }
//             });
  
//             let sql =     `DELETE FROM department WHERE department.id = ?`;
//             connection.promise().query(sql, [departmentId], (error) => {
//               if (error) throw error;
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               console.log(chalk.redBright(`DEPARTMENT IS NOW REMOVED`));
//               console.log(chalk.redBright.bold(`====================================================================================`));
//               viewAllDepartments();
//             });
//           });
//       });
//   };

