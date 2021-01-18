const UsersInstance = require("./UsersInstance");
const config = require("../config/config");

class Users {

    constructor() {
        throw new Error("You need to use Users.getInstance()");
    }

    static getInstance = () => {
        if (!Users.instance) {
            Users.instance = new UsersInstance();
        }
        return Users.instance;
    }

    static initUser = async (guild) => {
        await guild.members.fetch().then((users)=>{
            for (const user of users){
                Users.getInstance().append(user);
            }
            //console.log(Users.getInstance().list);
        });
    }
}


module.exports = Users;