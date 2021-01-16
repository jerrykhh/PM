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
            Users.initUser(this.message.guild).then(() => {
                this.#sendMessage();
            });
        else if(this.args[0] === "update"){
            Users.getInstance().clearData();
            Users.initUser(this.message.guild).then(() => {
                this.#sendMessage();
            });
        }else{
            this.#sendMessage();
        }

    }

    #sendMessage = () => {
        console.log('send message');
        if (this.args.length == 0 || this.args[0] == "update") {
            this.message.reply("\n" + this.#DisplayUsers(0, Users.getInstance().getUserList(0)));
        } else if (this.args[0] != "update") {
            this.message.reply("\n" + this.#DisplayUsers(0, Users.getInstance().getUserList(this.args[0])));
        } 
    }

    #DisplayUsers = (index, list) => {
        console.log("display");
        let users = "```index | Username(Nickname) | ID\n";
        for (const userObj of list) {
            const user = userObj.obj;
            if (index < config.displayMaxValue) {
                (!user[1].user.bot) ?
                    users += `${index} | ${user[1].user.username}\#${user[1].user.discriminator}${(user[1].nickname) ? "("+user[1].nickname+")": ""}  | ${user[0]}\n`
                    : users += `${index} | ${user[1].user.username}\#${user[1].user.discriminator}(BOT)  | ${user[0]}\n`;
            }
            index++;
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