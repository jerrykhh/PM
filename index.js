const Discord = require('discord.js');
const config = require('./config/config.js');
const CmdHandler = require('./cmdHandler.js');
const cmdController = new CmdHandler();
const client = new Discord.Client();
const Users = require('./statics/Users');

client.login(config.token);

client.once('ready', () => {
    console.log('PM discord.bot is Running at ' + (new Date()));
});

client.on('message', (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    if (Users.getInstance().size() == 0) 
        Users.initUser(message.guild).then(() => {
            cmdController.cmd(message);
        })
    else
        cmdController.cmd(message);
});