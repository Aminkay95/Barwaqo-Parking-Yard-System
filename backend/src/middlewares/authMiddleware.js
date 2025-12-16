import jwt from "jsonwebtoken";



function authMiddleware(req, res, next){
    //Extract Token
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        const error = new Error('Unauthorized')
        error.statusCode = 401;
        throw error
        
    }

    //Check Token Validity
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid token"})
        }

        req.user = decoded
        next()
    })

}


function isAdmin(req, res, next) {
    if(req.user && req.user.role === "admin"){
        next()
    } else {
        const error = new Error('Access Denied')
        error.statusCode = 403;
        throw error
    }
}


export {
    authMiddleware,
    isAdmin
}
