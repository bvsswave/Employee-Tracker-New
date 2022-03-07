-- Departments
INSERT INTO department(department_name)
VALUES("Photography"), ("Marketing"), ("Reception"), ("Engineering"), ("Customer Service");
-- Department Roles
INSERT INTO role(title, salary, department_id)
VALUES("Photographer", 50000, 1), ("Marketing Associate", 60000, 2), ("Receptionist", 40000, 3), ("Engineer", 780000, 4);
-- Employees in those Department
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Mitchell', 'Mason', 1, 1), ('Maddie', 'Rachel', 3, null) ('Ronnie', 'Manning', 1, 2), ('Jacob', 'Axel', 4, 4), ('Melissa', 'Jessica', null, 2);