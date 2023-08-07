const bcryptjs = require('bcryptjs')
const { User } = require('../models')

const usersPost = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json({
        msg: 'post API - controller',
        user
    });
}


const usersGet = async (req, res) => {
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query
    // const params = { q, nombre, apikey, page, limit }

    const { limit = 5, page = 1 } = req.query
    const query = { state: true }

    // const user = req.user;
    // const users = await User.find( query )
    //     .skip(Number(page - 1) * Number(limit))
    //     .limit(Number(limit))

    // const total = await User.countDocuments( query )

    const [total, data] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(page - 1) * Number(limit))
            .limit(Number(limit))
    ])

    res.json({
        total,
        data,
    });
}


const usersPatch = async (req, res) => {
    const { id } = req.params
    const { password, google, email, ...rest } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user);
}


const usersDelete = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { status: false })

    res.json(user)
}

module.exports = {
    usersPost,
    usersGet,
    usersPatch,
    usersDelete,
}