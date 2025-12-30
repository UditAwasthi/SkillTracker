import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({message: 'Not Logged In'});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        return res.status(401).json({message: 'Token expired or Invalid token'});
    }
}
export {requireAuth};
