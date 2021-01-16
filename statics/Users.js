const LinkedList = require("../collections/LinkedList");
const config = require("../config/config");
const PageNumberError = require('../errors/PageNumberError');

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

class UsersInstance {
    constructor() {
        this.list = new LinkedList();
    }

    append = (obj) => {
        this.list.append(obj);
    }

    clearData = () => {
        delete this.list;
        this.list = new LinkedList();
    }

    size = () => {
        return this.list.size();
    }

    getUserList = (pageno) => {
        if((this.list.size / config.displayMaxValue < pageno && pageno > 1) || pageno < 0)
            throw new PageNumberError();
        const endCount = pageno * config.displayMaxValue + this.size() % config.displayMaxValue
        try{
            return this.list.getList(pageno * config.displayMaxValue, endCount);
        }catch(e){
            throw new PageNumberError();
        }
    }

    getAllUserList = () => {
        return this.list.getList();
    }

}