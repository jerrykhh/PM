const commandFiles = require('fs').readdirSync('./commands/').filter(file => file.endsWith('.js'));
const NotMatchCommandError = require("./errors/NotMatchCommandError");

class CmdHandler {
    constructor() {
        this.commands = [];
        for (const file of commandFiles) {
            const command = require('./commands/' + file);
            this.commands[command.name] = command;
            console.log(command.name);
        }
    }

    cmd = (message) => {
        const args = message.content.slice(1).split(/ +/);
        const command = args.shift().toLocaleLowerCase();
        try{
            if (command == "ping") {
                (new this.commands.Ping(message, args)).run();
            }else if (command == "create-channel" || command == "c-chl"){
                (new this.commands.CreateChannel(message, args)).run();
            }else if (command == "set-reminder" || command == "s-rm"){
                (new this.commands.SetReminder(message, args)).run();
            }else if (command == "help"){
                (new this.commands.Help(message, args, commandFiles)).run();
            }else{
                throw new NotMatchCommandError();
            }
        }catch(e){
            message.channel.send(e.message);
        }
    }
}

module.exports = CmdHandler;