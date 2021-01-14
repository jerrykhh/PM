class DateTimeFormatError extends Error{
    constructor(message = "DateTime Format Error, format must be [YYYY-MM-dd] or [HH:mm:ss]"){
        super(message);
    }
}

module.exports = DateTimeFormatError;