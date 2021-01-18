const Instance = require("./Instance");
const config = require("../config/config");

class UsersInstance extends Instance{
    constructor() {
        console.log("new user inas")
        super();
    }

    displayUsers = (index, list) => {
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
            users += "\nnow pageno. " + (index / config.displayMaxValue);
        return users;
    }
}

module.exports = UsersInstance;