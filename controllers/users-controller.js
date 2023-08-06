
const usersPost = (req, res) => {
    res.json({
        msg: 'post API - controller'
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