const Command = require("./command");
const CommandArgsError = require("../errors/CommandArgsError");

class SetChannelName extends Command{

    constructor(message, args){
        super(message, args);
    }

    run = () => {
        if(this.args.length == 1){
            if(!this.message.member.hasPermission("MANAGE_CHANNELS"))
                throw new PermissionError("You don't have permission to change the channel name.");

            this.message.channel.setName(this.args[0]);
            this.message.reply("Channel name is change, named **" + this.args[0] + "**");
        }else{
            throw new CommandArgsError();
        }
    }

    static help = () => {
        return "set-channlname [new change name] | it will change the channel name."
    }

}

module.exports = SetChannelName;