const Command = require("./command");
const CommandArgsError = require('../errors/CommandArgsError');
const Users = require('../statics/Users');
const PermissionError = require('../errors/PermissionError');

class Blacklist extends Command {
    constructor(message, args) {
        super(message, args);
    }

    run = () => {

        if (this.args.length < 1)
            throw new CommandArgsError();
        else if (!this.message.member.hasPermission("BAN_MEMBERS")) {
            throw new PermissionError();
        } else if (this.args.length == 1) {
            let index = 0;
            let found = false;
            try {
                for (const userNode of Users.getInstance().getAllDataList()) {
                    const user = userNode.obj;
                    if (user[0] == this.args[0] || index == this.args[0]) {
                        this.#awaitBanUser(user);
                        found = true;
                    }
                    index++;
                }
                if (!found)
                    this.message.reply("**The user is not found**")

            } catch {
                this.message.reply("You do not have permissions");
            }
        }
    }

    #awaitBanUser = (user) => {
        console.log(user);
        this.#banUser(user[0]).then(() => {
            this.message.reply(`User: ${user[1].user.username}\#${user[1].user.discriminator} (${user[0]})  is banned`)
        }).catch((error) => {
            this.message.reply(err);
            this.message.reply(`You don't have permission to ban ${user[1].user.username}\#${user[1].user.discriminator} `);
        })
    }

    #banUser = async(user) => {
        await this.message.guild.members.ban(user)
    }

    static help = () => {
        return "!blacklist [index || user Id] | It can ban the user";
    }


}

module.exports = Blacklist