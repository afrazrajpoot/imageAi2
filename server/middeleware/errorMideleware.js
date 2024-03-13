module.exports = async(err, req, res, next) => {
    // If err is not defined or does not have a statusCode property, set default values
    if (!err || !err.statusCode) {
        err = {
            statusCode: 500,
            message: err.message
        };
    }

    // Set default message if it's not defined
    err.message = err.message || 'Internal Server Error';

    // Send error response
    res.status(err.statusCode).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    });
};
