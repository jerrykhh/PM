const Command = require('./command');
const schedule = require("node-schedule");
const CommandArgsError = require('../errors/CommandArgsError');
const TimeFormatError = require('../errors/TimeFormatError');

class SetReminder extends Command {
    constructor(message, args) {
        super(message, args);
        this.dateTime = new Date(args[0]);
    }

    run = () => {
        if (this.args.length < 1 || this.args.length > 4)
            throw new CommandArgsError();

        this.reminderMessage = null;
        if (this.args.length == 2 || this.args.length == 3) {
            const chkDateTime = new Date(this.args[0] + " " + this.args[1]);
            if(chkDateTime === "Invalid Date")
                this.reminderMessage = this.args[1];
            else
                this.dateTime = chkDateTime;

            if(args.length == 3)
                this.reminderMessage = this.args[2]
        } 

        let scheduledJob =  schedule.scheduleJob(dateTime, () =>{
            if(this.reminderMessage == null)
                this.message.channel.send("Today has scheduled the reminder. (" + this.dateTime + ")");
            else
                this.message.channel.send("Remind: " + this.reminderMessage);
        });

        this.message.channel.send("This channel is set the reminder at " + this.dateTime);

    }

    static help = () => {
        return "!set-reminder [date (YYYY-MM-dd)] [[HH:mm || HH:mm:ss (option)] || Reminder Message (option)] [Reminder Message (option), if set the time]"
    }

}


module.exports = SetReminder;