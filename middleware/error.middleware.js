const errorMiddleWare = (err, req, res, next) => {
    try {
        let error = {...err};

        console.error(err);
        //mongoose bad ObjectId
        
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error.statusCode = 404;
            error = new Error(message);
        }

        // Mongoose Duplicate key error 

        if (error.code === 11000) {
            const message = `Duplicate field value entered: ${error.keyValue.name}`;
            error = new Error(message);
            error.statusCode = 400;
        }

        if (error.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'});

    } catch(error)
    {
        next(error);
    }
};

export default errorMiddleWare;