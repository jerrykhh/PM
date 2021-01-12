const Command = require("./command");

class Help extends Command{
    constructor(){
        super("help", "This is help command");
    }

    run = (message, args) => {

    }
}

module.exports = Help;