const Command = require("./command");
const NotMatchCommandError = require("../errors/NotMatchCommandError");

class Help extends Command{
    constructor(message, args, commandFiles){
        super(message, args);
        this.commandFiles = commandFiles;
    }

    run = () => {
        if(this.args.length == 0){
            let cmd = "";
            const maxCommandCount = 10;
            let countCommand = 0;
            for(const file of this.commandFiles){
                const command = require('./' + file);
                try{
                    if(countCommand >= maxCommandCount) break;
                    cmd += "```"+ command.help() + "\n```";
                    countCommand++;
                }catch(e){}
            }
            this.message.channel.send(cmd);
        }else if (this.args.length == 1){
            let found = false;
            for(const file of this.commandFiles){
                if(file.toLocaleLowerCase().substring(0, file.length - 3) === this.args[0].toLocaleLowerCase()){
                    const command = require('./' + file);
                    try{
                        this.message.channel.send("```" + command.help() + "```");
                    }catch(e){
                        throw new NotMatchCommandError(this.args[1] + " command not found. You can use the !help command to find the command list");
                    }
                    found = true;
                    break;
                }
            }
            if(!found)
                throw new NotMatchCommandError();
        }else{
            throw new NotMatchCommandError();
        }
    }

    static help = () => {
        return "!help [command (option)] | It will show the command details to you";
    }
}

module.exports = Help;