const Employee = require("./employee");

class Manager extends Employee {
    constructor(name,id,email,officeId) {
        super(name,id,email);
        this.officeId = officeId;
    }

    getPosistion() {
        return "Manager";
    }

    getOfficeId() {
        return this.officeId;
    }
}

module.exports = Manager;