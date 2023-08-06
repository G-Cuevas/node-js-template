
const validateRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Token error'
        });
    }

    const role = req.user.role;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Token error'
            });
        }

        const role = req.user.role;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }

        next();
    }
}
        

module.exports = {
    validateRole,
    hasRole
}