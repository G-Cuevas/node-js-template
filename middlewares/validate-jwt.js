const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Missing token'
        });
    }

    try {

        const { uid } = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY
        );

        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: 'Invalid token'
        });

    }

    
}


module.exports = {
    validateJWT
}