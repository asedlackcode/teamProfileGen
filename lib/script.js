const fs = require('fs');
const util = require('util')
const inquirer = require('inquirer');
module.exports = require('./employee');

const writeFileAsync = util.promisify(fs.writeFile)

let promptUser = () => {
    return inquirer.prompt([{
        type:'input',
        name: 'name',
        message: 'What is your employee\'s name?'
    },
    {
        type:'input',
        name:'posistion',
        message:'What posistion are they in?'
    },
    {
        type:'input',
        name:'id',
        message:'What is their ID #'
    },
    {
        type:'input',
        name:'email',
        message:'What is their email?'
    },
    {
        type:'input',
        name:'github',
        message:'What is their github username?'
    },
])
};

const generateHTML = (answers) =>{
return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Here we go</title>
</head>
<body>
        <p>${answers.name}</p>
        <p>${answers.location}</p>
        <p>${answers.bio}</p>
        <p>${answers.linkedinURL}</p>
        <p>${answers.githubURL}</p>
</body>
</html>`;
};

// promptUser();

async function init(){
    try{
        const answers = await promptUser();
        const html = generateHTML(answers);
        await writeFileAsync("index.html", html)
        printInfo();
        console.log('Success')
    }  catch(err){
        console.log(err)
    }
}

init();