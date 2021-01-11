class Command {
    constructor(name, desc){
        this.name = name;
        this.desc = desc;
    }

    run = (message, args) => {
        throw new Error('You have to implement the method doSomething!');
    }

}

module.exports =  Command;