class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : " Error"; //<~ 4xx: Client Error
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    };
};

module.exports = AppError;