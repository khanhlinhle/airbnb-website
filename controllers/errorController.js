exports.notFound = async (request, response, next) => {
    response.status(404).json({
        status: "Fail",
        message: "URL not found"
    });
};

exports.catchAsync = func => {
    return (request, response, next) => func(request, response, next).catch(next);
};

exports.errorHandler = (error, request, response, next) => {
    // default err object of undefined
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    response.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
};