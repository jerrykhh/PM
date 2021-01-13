const Logging = require("../model/Logging");
class Command {
    constructor(message, args){
        this.message = message;
        this.args = args;
    }

    run = () => {
        throw new Error('You have to implement the method doSomething!');
    }

    logging = (command) => {
        throw new Error('You have to implement the method doSomething!');
    }

    static help = () => {
        throw new Error('You have to implement the method doSomething!');
    }

}

module.exports =  Command;