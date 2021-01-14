const Command = require("./command");
const CommandArgsError = require("../errors/CommandArgsError");
const ChannelNotFoundError = require("../errors/ChannelNotFoundError");

class SetChannelCategory extends Command{
    constructor(message, args){
        super(message, args);
    }

    run = () => {
        if(this.args.length == 0){
            let categories = "```index | Category ID | Category Name\n";
            let index = 0;
            for(const channel of this.message.guild.channels.cache){
                if(channel[1].type === 'category'){
                    categories += `${index} | ${channel[1].id} | ${channel[1].name} \n`
                    index++;
                }
            }
            categories += "```";
            this.message.reply("\n" + categories);
        }else if (this.args.length == 1){
            let index = 0;
            let foundChannel = null;
            
            for(const channel of this.message.guild.channels.cache){
                if(channel[1].type === 'category'){                    
                    if(index == this.args[0]){
                        foundChannel = channel;
                        break;
                    }
                    index++;
                }
            }

            if(foundChannel == null)
                throw new ChannelNotFoundError();
            
            const permission = this.message.channel.permissionOverwrites;
            this.message.channel.setParent(foundChannel[1].id);
            this.message.channel.overwritePermissions(permission);
            this.message.reply("The Channel Category is change to **" + foundChannel[1].name + "**");

        }else{
            throw new CommandArgsError();
        }
        
    }

    static help = () => {
        return "!set-channelcategory [index of the all channel categorises (option), if not this parameter will show the categorises list]"
    }


}

module.exports = SetChannelCategory;