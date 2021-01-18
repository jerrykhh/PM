const Instance = require("./Instance");
const config = require("../config/config");
const UsersInstance = require("./UsersInstance");

class BannedUsers {

    constructor(){
        throw new Error("You need to use BannedUsers.getInstance(");
    }

    static getInstance = () => {
        if(!BannedUsers.instance){
            console.log("new")
            BannedUsers.instance = new BannedUsersInstance();
        }

        return BannedUsers.instance;
    }

    static initBannedUsers =  async(guild) => {
        await guild.fetchBans().then((users) => {
            for(const user of users)
                BannedUsers.getInstance().append(user);
            console.log(BannedUsers.getInstance().list);
        });
    }

    

} 

module.exports = BannedUsers;

class BannedUsersInstance extends UsersInstance{

    constructor(){
        super();
    }
    
}