class CoustomError extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.stack = (new Error()).stack;
        Error.captureStackTrace(this, CoustomError);

    }
}
module.exports = CoustomError;