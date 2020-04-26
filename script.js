const fs = require('fs');
const util = require('util')
const inquirer = require('inquirer');
const path = require("path");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");


const OUTPUT_DIR = path.resolve(__dirname, "output")
const output_path = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/renderer");

const theTeam = [];
const idArray = [];

function menu() {

    function promptUser() {
        return inquirer.prompt([{
        type: 'input',
        name: 'managerName',
        message: 'What is your manager\'s name?',
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Must enter at least one character."
        }
    },
    {
        type:'input',
        name: 'managerId',
        message: 'What is your manager\'s ID?',
        validate: answer => {
            const pass = answer.match(
                /^[1-9]\d*$/
            );
            if (pass) {
                return true;
            }
            return "Must enter a positive number.";
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager\'s email address?",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if(pass) {
                return true;
            }
            return "Must enter a vaild email address.";
        }
    },
    {
        type: "input",
        name: "managerOfficeId",
        message: "What is your manager\'s office ID #?",
        validate: answer => {
            const pass = answer.match(
                /^[1-9]\d*$/
            );
            if(pass) {
                return true;
            }
            return "Must enter a positive number.";
        }
    }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeId);
        theTeam.push(manager);
        idArray.push(answers.managerId);
        employeeInput();
    });
    };
    function employeeInput() {
        return inquirer.prompt([
        {
        type:'list',
        name:'posistion',
        message: "What posistion is the empolyee?",
        choices: [
            "Engineer",
            "Intern", 
            "Done adding members."
        ]
        }
    ]).then(userChoice => {
        switch(userChoice.posistion) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                createTeam();
        }
    });
    }
    function addEngineer() {
        inquirer.prompt([

        {
        type: "input",
        name: 'engineerName',
        message: 'What is the engineer\'s name?',
        validate: answer => {
            if(answer !== "") {
                return true;
            }
            return "Must enter at least one character."
        }
        },
        {
        type:'input',
        name:'engineerId',
        message:'What is their ID #',
        validate: answer => {
            const pass = answer.match(
                /^[1-9]\d*$/
            );
            if (pass) {
                if (idArray.includes(answer)) {
                    return "ID is taken by someone already."
                } else {
                     return true;
                }
            } return "Must enter a positive number."
        }
        },
        {
        type:'input',
        name:'engineerEmail',
        message:'What is their email?',
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if (pass) {
                return true;
            } 
            return "Must enter a vaild email address."
        }
        },
        {
        type:'input',
        name:'engineerGithub',
        message:'What is their github username?',
        validate: answer =>  {
            if (answer !== "") {
                return true;
            }
            return "Must enter at least one character."
        }
        }
    ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    theTeam.push(engineer);
    idArray.push(answers.engineerId);
    employeeInput();
    });
    }

    function addIntern() {
        inquirer.prompt([

        {
        type: "input",
        name: 'internName',
        message: 'What is the intern\'s name?',
        validate: answer => {
            if(answer !== "") {
                return true;
            }
            return "Must enter at least one character."
        }
        },
        {
        type:'input',
        name:'internId',
        message:'What is their ID #',
        validate: answer => {
            const pass = answer.match(
                /^[1-9]\d*$/
            );
            if (pass) {
                if (idArray.includes(answer)) {
                    return "ID is taken by someone already."
                } else {
                     return true;
                }
            } return "Must enter a positive number."
        }
        },
        {
        type:'input',
        name:'internEmail',
        message:'What is their email?',
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if (pass) {
                return true;
            } 
            return "Must enter a vaild email address."
        }
        },
        {
        type:'input',
        name:'internSchool',
        message:'What school are they from?',
        validate: answer =>  {
            if (answer !== "") {
                return true;
            }
            return "Must enter at least one character."
        }
        }
    ]).then(answers => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    theTeam.push(intern);
    idArray.push(answers.internId);
    
    employeeInput();
    });
    };

    function createTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(output_path,render(theTeam), "utf8");
        console.log(theTeam);
    console.log(idArray);
    }
    promptUser();
};

menu();
//add intern