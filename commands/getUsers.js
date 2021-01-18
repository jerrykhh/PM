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
        if (this.args.length == 0 || this.args[0] == "update") {
            this.message.reply("\n" + Users.getInstance().displayUsers(0, Users.getInstance().getDataList(0)));
        } else if (this.args[0] != "update") {
            this.message.reply("\n" + Users.getInstance().displayUsers(0, Users.getInstance().getDataList(this.args[0])));
        } 
    }

    static help = () => {
        return "!get-users [[update (option)] || [pageno]] | it will return the user list (include the index)"
    }
}

module.exports = GetUsers;