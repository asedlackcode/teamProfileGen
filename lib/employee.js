class Employee {
    constructor(name,posistion,id,email,github) {
        if (!name) {
            throw new Error("You are missing the employee's name.")
        }
        if (!posistion) {
            throw new Error("You are missing the employee's posistion.")
        }
        if (!id) {
            throw new Error("You are missing the employee's id #.")
        }
        if (!email) {
            throw new Error("You are missing the employee's email.")
        }
        if (!github) {
            throw new Error("You are missing the employee's github.")
        }
        this.name = name;
        this.posistion = posistion;
        this.id = id;
        this.email = email;
        this.github = github;
    }

    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Posistion: ${this.posistion}`);
        console.log(`Id: ${this.id}`);
        console.log(`Email: ${this.email}`);
        console.log(`Github: ${this.github}`);
    }
    
}
module.exports.Employee = Employee