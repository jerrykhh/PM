const Command = require('./command');

class Ping extends Command{
    constructor(){
        super("ping", "This is a ping command");
    }

    run = (message, args) => {
        message.channel.send("pong!");
    }
}

module.exports = Ping;
