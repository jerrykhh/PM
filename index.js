const Discord = require('discord.js');
const config = require('./config/config.js');
const CmdHandler = require('./cmdHandler.js');
const cmdController = new CmdHandler();
const client = new Discord.Client();
client.login(config.token);


client.once('ready', () => {
    console.log('PM discord.bot is Running at ' + (new Date()));
});

client.on('message', (message) => {
    cmdController.cmd(message);
});