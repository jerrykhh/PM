const Command = require("./command");
const PermissionError = require("../errors/PermissionError");
const CommandArgsError = require("../errors/CommandArgsError");
const { User } = require("discord.js");
const Users = require("../statics/Users");

class RemoveBlacklist extends Command{

    constructor(message, args){
        super(message, args);
    }

    run = () => {
        if(!this.message.member.hasPermission("ADMINISTRATOR"))
            throw new PermissionError();
        
        if(this.args.length >= 1){
            this.message.guild.fetchBans().then((user) => {
                
            });

            
        }else{
            throw new CommandArgsError();
        }
    }
 
    help = () => {
        return "remove-blacklist [ index || userID] | it will unban the user"
    }

}

module.exports = RemoveBlacklist;