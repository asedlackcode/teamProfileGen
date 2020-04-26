const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
    const html = [];

    html.push(employees
        .filter(employee => employee.getPosistion()  === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(employees
        .filter(employee => employee.getPosistion()  === "Engineer")
        .map(engineer => renderEngineer(engineer))
    );   
    html.push(employees
        .filter(employee => employee.getPosistion()  === "Intern")
        .map(intern => renderIntern(intern))
    );

    return renderAll(html.join(""));
};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    template = replacePlaceholder(template, "name", manager.getName());
    template = replacePlaceholder(template, "posistion", manager.getPosistion());
    template = replacePlaceholder(template, "email", manager.getEmail());
    template = replacePlaceholder(template, "id", manager.getId());
    template = replacePlaceholder(template, "officeID", manager.getOfficeId());
    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    template = replacePlaceholder(template, "name", engineer.getName());
    template = replacePlaceholder(template, "posistion", engineer.getPosistion());
    template = replacePlaceholder(template, "email", engineer.getEmail());
    template = replacePlaceholder(template, "id", engineer.getId());
    template = replacePlaceholder(template, "github", engineer.getGithub());
    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    template = replacePlaceholder(template, "name", intern.getName());
    template = replacePlaceholder(template, "posistion", intern.getPosistion());
    template = replacePlaceholder(template, "email", intern.getEmail());
    template = replacePlaceholder(template, "id", intern.getId());
    template = replacePlaceholder(template, "school", intern.getSchool());
    return template;
};

const renderAll = html => {
    const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    return replacePlaceholder(template, "myTeam", html);  
};

const replacePlaceholder = (template, placeholder, value) => {
    const pattern = new RegExp("{{" + placeholder + "}}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;