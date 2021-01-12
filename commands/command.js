const Logging = require("../model/Logging");
class Command {
    constructor(name, desc){
        this.name = name;
        this.desc = desc;
    }

    run = (message, args) => {
        throw new Error('You have to implement the method doSomething!');
    }

    logging = (user, message, command) => {
        this.logging = new Logging(user, message, command);
    }

}

module.exports =  Command;