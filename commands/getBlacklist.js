const CommandArgsError = require('../errors/CommandArgsError');
const BannedUsers = require('../statics/BannedUsers');
const Command = require('./command');


class GetBlacklist extends Command {

    constructor(message, args) {
        super(message, args);
    }

    run = () => {
        if (BannedUsers.getInstance().size() <= 0)
            BannedUsers.initBannedUsers(this.message.guild).then(() => {
                this.#sendMessage(true);
            });
        else
            this.#sendMessage();

    }

    #sendMessage = (inited = false) => {
        if (this.args[0] == "update") {
            if (inited) {
                BannedUsers.getInstance().clearData();
                BannedUsers.initBannedUsers(this.message.guild).then(() => {
                    this.message.reply("\n" + BannedUsers.getInstance().displayUsers(0, BannedUsers.getInstance().getDataList(0)));
                });
            } else {
                this.message.reply("\n" + BannedUsers.getInstance().displayUsers(0, BannedUsers.getInstance().getDataList(0)));
            }
        } else {
            this.message.reply("\n" + BannedUsers.getInstance().displayUsers(0, BannedUsers.getInstance().getDataList(this.args[0])));
        }
    }

    static help = () => {
        return "!get-blacklist [pageno (option) || update ] | it is show the banlist"
    }


}

module.exports = GetBlacklist;