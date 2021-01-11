const Command = require('./command');
const PermissionError = require('../errors/PermissionError'); 
const CommandArgsError = require('../errors/CommandArgsError');

class CreateChannel extends Command {
    constructor() {
        super("create-channel", "Create the text channel command");
    }

    run = (message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) 
            throw new PermissionError("You don't have permission to create the channel.");

        if(args.length < 1)
            throw new CommandArgsError(); 
        
        const date = new Date();
        this.calendarDate = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + date.getDate();
        message.guild.channels.create(this.calendarDate + "-" + args[0], {
            type: 'text'
        })

        /*
        permissionOverwrites: [
                {
                  id: message.author.id,
                  deny: ['VIEW_CHANNEL'],
               },
             ],
        */
        //message.guild.channels.create()
        //if(!args[1]) return message.channel.send("")
    }
}

module.exports = CreateChannel;
