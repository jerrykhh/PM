const Command = require('./command');
const schedule = require("node-schedule");
const CommandArgsError = require('../errors/CommandArgsError');
const DateTimeFormatError = require('../errors/DateTimeFormatError');

class SetReminder extends Command {
    constructor(message, args) {
        super(message, args);
        this.dateTime = new Date(args[0] + " 00:00:00");
        if(this.dateTime === "Invalid Date")
            throw new DateTimeFormatError();
    }

    run = () => {
        if (this.args.length < 1)
            throw new CommandArgsError();
        this.reminderMessage = "";
        if (this.args.length > 2) {
            const chkDateTime = new Date(this.args[0] + " " + this.args[1]);
            if(chkDateTime === "Invalid Date"){
                for(let i = 1; i < this.args.length; i++)
                    this.reminderMessage += this.args[i] + " ";
            }else if (chkDateTime != "Invalid Date"){
                this.dateTime = chkDateTime;
            }

            if(chkDateTime != 'Invalid Date' && this.args.length >= 3){
                for(let i = 2; i < this.args.length; i++)
                    this.reminderMessage += this.args[i] + " ";
            }
        } 
        let scheduledJob =  schedule.scheduleJob(this.dateTime, () =>{
            if(this.reminderMessage == "")
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