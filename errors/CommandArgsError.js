class CommandArgsError extends Error{
    constructor(message = "Command arguments Error"){
        super(message);
    }
}

module.exports = CommandArgsError;