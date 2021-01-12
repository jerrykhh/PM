const Command = require('./command');
const schedule = require("node-schedule");
const CommandArgsError = require('../errors/CommandArgsError');

class SetReminder extends Command{
    constructor(){
        super("set-reminder", "Reminder Command");
    }

    run = (message, args) => {
        if(args.length < 1)
            throw new CommandArgsError();

        
        
    }

}