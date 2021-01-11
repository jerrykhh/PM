class PermissionError extends Error{
    constructor(message = "Permsssion Error"){
        super(message);
    }
}

module.exports = PermissionError;