const commandFiles = require('fs').readdirSync('./commands/').filter(file => file.endsWith('.js'));
const NotMatchCommandError = require("./errors/NotMatchCommandError");

class CmdHandler {
    constructor(client) {
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
            }else if (command == "create-ch" || command == "c-ch"){
                (new this.commands.CreateChannel(message, args)).run();
            }else if (command == "set-reminder" || command == "s-rmd"){
                (new this.commands.SetReminder(message, args)).run();
            }else if (command == "help"){
                (new this.commands.Help(message, args, commandFiles)).run();
            }else if (command == "set-channelname" || command == "s-chn"){
                (new this.commands.SetChannelName(message, args)).run();
            }else if (command == "set-channelcategroy" || command == "s-chcat"){
                (new this.commands.SetChannelCategory(message, args)).run();
            }else if (command == "set-nickname" || command == "s-nickname"){
                (new this.commands.SetNickname(message, args)).run();
            }else if (command == "get-users" || command == "g-users"){
                (new this.commands.GetUsers(message, args)).run();
            }else if (command == "blacklist" || command == "blt"){
                (new this.commands.Blacklist(message, args)).run();
            }else{
                throw new NotMatchCommandError();
            }
        }catch(e){
            message.reply(e.message);
        }
    }
}

module.exports = CmdHandler;