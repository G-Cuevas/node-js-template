const jwt = require('jsonwebtoken');
const { User } = require('../models');

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
                msg: 'Invalid token - user does not exist in DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - user state: false'
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: 'Invalid token - catch'
        });

    }

    
}


module.exports = {
    validateJWT
}