const Command = require('./command');
const PermissionError = require('../errors/PermissionError');
const CommandArgsError = require('../errors/CommandArgsError');

class CreateChannel extends Command {
    constructor(message, args) {
        super(message, args);
    }

    run = () => {

        if (!this.message.member.hasPermission('MANAGE_CHANNELS'))
            throw new PermissionError("You don't have permission to create the channel.");

        if (this.args.length < 1)
            throw new CommandArgsError();

        const date = new Date();
        this.calendarDate = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + date.getDate();
        this.message.guild.channels.create(this.calendarDate + "-" + args[0], {
            type: 'text',
            permissionOverwrites: [
                {
                    id: this.message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: this.message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
            ]
        }).then(channel => {
            channel.send(`${channel.name} created at ${date}`);
            console.log(`Created new channel ${channel.name} at ${date}`);
        });
    }

    static help = () => {
        return "!create-channel [channel-name] | It will create the channel, default permission is only you can view";
    }
}

module.exports = CreateChannel;
