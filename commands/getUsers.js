const Command = require("./command");
const Users = require("../statics/Users");
const config = require("../config/config");

class GetUsers extends Command {
    constructor(message, args) {
        super(message, args);
        this.size = 0;
    }

    run = () => {
        if (Users.getInstance().size() == 0)
            this.#initUsers();

        if (this.args[0] === "update") {
            Users.getInstance().clearData();
            this.#initUsers();
            this.message.reply("\n" + this.#DisplayUsers(0, Users.getInstance().getUserList(0)));
        } else if (this.args.length == 0) {
            this.message.reply("\n" + this.#DisplayUsers(0, Users.getInstance().getUserList(0)));
        } else if (this.args[0] != "update") {
            this.message.reply("\n" + this.#DisplayUsers(0, Users.getInstance().getUserList(this.args[0])));
        }

    }

    #initUsers = () => {
        let index = 0;
        for (const user of this.message.guild.members.cache)
            Users.getInstance().append(user[1].user);
        this.size = index;
    }

    #DisplayUsers = (index, list) => {
        let users = "```index | Username | ID\n";
        for (const userObj of list) {
            console.log(userObj);
            const user = userObj.obj;
            console.log(user);
            if (index < config.displayMaxValue) {
                (!user.bot) ?
                    users += `${index} | ${user.username}\#${user.discriminator}  | ${user.id}\n`
                    : users += `${index} | ${user.username}\#${user.discriminator}(BOT)  | ${user.id}\n`;
            }
            index++;
            console.log(index);
        }
        users += "```";
        if (index > config.displayMaxValue)
            users += "\n!get-users [pageNumber], now pageno. " + (index / config.displayMaxValue);
        return users;
    }

    static help = () => {
        return "!get-users [[update (option)] || [pageno]] | it will return the user list (include the index)"
    }
}

module.exports = GetUsers;