
const usersPost = (req, res) => {
    
    const { id, edad } = req.body
    const body = { id, edad }

    res.json({
        msg: 'post API - controller',
        body
    });
}


const usersGet = (req, res) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query
    const params = { q, nombre, apikey, page, limit }

    res.json({
        msg: 'get API - controller',
        params
    });
}


const usersPatch = (req, res) => {
    const { id } = req.params

    res.json({
        msg: 'patch API - controller',
        id
    });
}


const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usersPost,
    usersGet,
    usersPatch,
    usersDelete,
}