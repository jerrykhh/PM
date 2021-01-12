class NotMatchCommandError extends Error{
    constructor(message = "Command Not Found. You can use the !help command to find the command list"){
        super(message);
    }
}

module.exports = NotMatchCommandError;