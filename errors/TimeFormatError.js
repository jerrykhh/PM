class TimeFormatError extends Error{
    constructor(message = "Time Format Error, format must be [HH:mm]"){
        super(message);
    }
}

module.exports = TimeFormatError;