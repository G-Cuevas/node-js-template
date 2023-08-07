const bcryptjs = require('bcryptjs')

const { generateJWT } = require('../helpers/generateJWT')
const { User } = require('../models')


const authPost = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Incorrect email or password'
        })
    }

    const token = await generateJWT(user._id);


    res.json({
        user,
        token
    });
}


module.exports = {
    authPost,
}