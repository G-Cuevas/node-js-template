const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const { generateJWT } = require('../helpers/generateJWT')


const authPost = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Incorrect email or password'
        })
    }

    const token = await generateJWT(user.id);


    res.json({
        user,
        token
    });
}


module.exports = {
    authPost,
}