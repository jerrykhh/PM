const Command = require("./command");
const PermissionError = require("../errors/PermissionError");
const CommandArgsError = require("../errors/CommandArgsError");

class SetNickname extends Command{
    constructor(message, args){
        super(message, args);
    }

    run = () => {
        //console.log(this.message.member.roles.highest);

        if (!this.message.member.hasPermission('MANAGE_NICKNAMES')) 
            throw new PermissionError('I don\'t have permission to change your nickname!');
        if(this.args.length == 1){
            try{
                this.message.member.setNickname(this.args[0]);
            }catch(e){
                this.message.reply("You don't have any permission to change nickname");
            }
        }else if(this.args.length == 2){
            try{
                let index = 0;
                for( const user of this.message.guild.members.cache){
                    if(user[0] == this.args[1] || index == this.args[1] ){
                        user[1].setNickname(this.args[0]);
                        this.message.reply("Username: " + user[1].user.username + ", updated to **" + this.args[0] + "**");
                        break;
                    }
                    index++;
                }
            }catch(e){
                this.message.reply("You don't have any permission to change nickname");
            }
        }else
            throw new CommandArgsError();
        
    }

    static help = () => {
        return "!set-nickname [new nickname] [userIndex] | Change Your nickname (Owner Could not use this cmd)";
    }
}

module.exports = SetNickname;