import jwt from 'jsonwebtoken';

const auth = (req,res,next) => {
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}

export default auth;