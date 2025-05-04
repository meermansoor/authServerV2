import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req,1);
        if(decision.isDenied) {
            if(decision.reason.isRateLimit()){return res.status(429).json({message: "Rate limit exceeded"});}
            if(decision.reason.isBot()){return res.status(403).json({message: "Bot detected"});}

            return res.status(403).json({message: 'Request denied'});

        }

        next();
        
    } catch (error) {
        next(error);
        
    }


}

export default arcjetMiddleware;