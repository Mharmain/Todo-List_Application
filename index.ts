#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.blueBright.bold('\n\tWelcome to \'Muhammad Harmain\' - CLI Todo List App\n'));
let todoList: string[] = [];
let loop = true;
while (loop) {
    let options = await inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: chalk.yellow('Choose an option:'),
            choices: ['Add Task', 'Delete Task', 'Update Task', 'View Todo List', 'Exit']
        }
    ]);
    switch (options.option) {
        case 'Add Task':
            let task = await inquirer.prompt([
                {
                    name: 'task',
                    type: 'input',
                    message: chalk.yellow('Enter task:')
                }
            ]);
            todoList.push(task.task);
            console.log(chalk.green(task.task, 'Task added successfully!\n'));
            break;
        case 'Delete Task':
            let taskToDelete = await inquirer.prompt([
                {
                    name: 'task',
                    type: 'list',
                    message: chalk.yellow('Choose task to delete:'),
                    choices: todoList
                }
            ]);
            todoList = todoList.filter(task => task !== taskToDelete.task);
            console.log(chalk.red(taskToDelete.task, 'Task deleted successfully!\n'));
            break;
        case 'Update Task':
            let taskToUpdate = await inquirer.prompt([
                {
                    name: 'task',
                    type: 'list',
                    message: chalk.yellow('Choose task to update:'),
                    choices: todoList
                },
                {
                    name: 'newTask',
                    type: 'input',
                    message: chalk.yellow('Enter new task:')
                }
            ]);
            todoList = todoList.map(task => task === taskToUpdate.task ? taskToUpdate.newTask : task);
            console.log(chalk.magenta(taskToUpdate.task, 'Task updated successfully!\n'));
            break;
        case 'View Todo List':
            console.log(chalk.blueBright.bold('\nTodo List:'));
            todoList.forEach((task, index) => {
                console.log(chalk.green(index + 1, ':', task));
            });
            console.log();
            break;
        case 'Exit':
            loop = false;
            break;
    }
}
console.log(chalk.green('Your Todo List is:'), todoList, '\n');
console.log(chalk.blueBright.bold('Todo List App closed successfully!'));
console.log(chalk.blueBright.bold('\tGood Bye!\n'));