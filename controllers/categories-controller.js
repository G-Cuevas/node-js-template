const { Category } = require("../models")



const categoriesGetAll = async (req, res) => {
    const { limit = 5, page = 1 } = req.query
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(page - 1) * Number(limit))
            .limit(Number(limit))
            .populate('user', 'name')
    ])

    res.json({
        total,
        categories
    })
}

const categoriesGet = async (req, res) => {
    const { id } = req.params

    const category = await Category.findById(id)
        .populate('user', 'name')

    res.json(category)
}


const categoriesPost = async (req, res) => {
    const name = req.body.name.toUpperCase()

    const categoryWithName = await Category.findOne({ name })

    if (categoryWithName) {
        return res.status(400).json({
            msg: `Category ${categoryWithName.name} already exists`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)

    await category.save()

    res.status(201).json(category)
}


const categoriesPatch = async (req, res) => {

    const { id } = req.params
    const name = req.body.name.toUpperCase()

    const categoryWithName = await Category.findOne({ name })

    if (categoryWithName && categoryWithName._id != id) {
        return res.status(400).json({
            msg: `Category ${categoryWithName.name} already exists`
        })
    }

    const category = await Category.findByIdAndUpdate(id, { name }, { new: true })

    res.json( category )

}


const categoriesDelete = async (req, res) => {
    const { id } = req.params

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json( category )

}

module.exports = {
    categoriesGetAll,
    categoriesGet,
    categoriesPost,
    categoriesPatch,
    categoriesDelete
}