const Command = require('./command');
const schedule = require("node-schedule");
const CommandArgsError = require('../errors/CommandArgsError');
const TimeFormatError = require('../errors/TimeFormatError');

class SetReminder extends Command {
    constructor() {
        super("set-reminder", "Reminder Command");
    }

    run = (message, args) => {
        if (args.length < 1 || args.length > 4)
            throw new CommandArgsError();

        let dateTime = new Date(args[0]);
        let reminderMessage = null;
        if (args.length == 2 || args.length == 3) {
            const chkDateTime = new Date(args[0] + " " + args[1]);
            if(chkDateTime === "Invalid Date")
                reminderMessage = args[1];
            else
                dateTime = chkDateTime;

            if(args.length == 3)
                reminderMessage = args[2]
        } 

        let scheduledJob =  schedule.scheduleJob(dateTime, () =>{
            if(reminderMessage == null)
                message.channel.send("Today has scheduled the reminder. (" + dateTime + ")");
            else
                message.channel.send("Remind: " + reminderMessage);
        });

        message.channel.send("This channel is set the reminder at " + dateTime);

    }

}


module.exports = SetReminder;