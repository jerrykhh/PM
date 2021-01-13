const Command = require('./command');

class Ping extends Command{
    constructor(message, args){
        super(message, args);
    }

    run = () => {
        this.message.reply("pong!");
    }

    static help = () => {
        return "!ping | It will return 'pong', let you know the bot is work."
    }
}

module.exports = Ping;
