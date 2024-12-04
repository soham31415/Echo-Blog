import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next){
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
            return res.status(401).json({error: "JWToken is missing"});

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userDetails = payload;
        next();

    } catch (error) {
        return res.status(403).json({error: "Invalid or expired token"});
    }
}