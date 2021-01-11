const commandFiles = require('fs').readdirSync('./commands/').filter(file => file.endsWith('.js'));

class CmdHandler {
    constructor() {
        this.commands = [];
        for (const file of commandFiles) {
            const command = require('./commands/' + file);
            this.commands[command.name] = command;
        }
    }

    cmd = (message) => {
        const args = message.content.slice(1).split(/ +/);
        const command = args.shift().toLocaleLowerCase();
        try{
            if (command == "ping") {
                (new this.commands.Ping()).run(message, args);
            }else if (command == "create-channel" || command == "c-chl"){
                (new this.commands.CreateChannel()).run(message, args);
            }
        }catch(e){
            message.channel.send(e.message);
        }
    }
}

module.exports = CmdHandler;