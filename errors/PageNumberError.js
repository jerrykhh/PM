class PageNumberError extends Error {
    constructor(message = "Page number is not found"){
        super(message);
    }
}

module.exports = PageNumberError;