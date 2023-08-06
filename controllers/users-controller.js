
const usersPost = (req, res) => {
    
    const { id, edad } = req.body
    const body = { id, edad }

    res.json({
        msg: 'post API - controller',
        body
    });
}


const usersGet = (req, res) => {
    res.json({
        msg: 'get API - controller'
    });
}


const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controller'
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