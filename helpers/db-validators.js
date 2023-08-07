
const { Role, User } = require('../models')

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ name: role })
    if (!roleExists) {
        throw new Error('Role is not valid')
    }
}

const uniqueEmail = async (email = '') => {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new Error('Email already exists')
    }
}

const existingUserById = async ( id ) => {
    const userExists = await User.findById(id)
    if (!userExists) {
        throw new Error(`User with id ${id} does not exist`)
    }
}

const existingUserByEmail = async ( email ) => {
    const userExists = await User.findOne({ email })
    if (!userExists) {
        throw new Error(`User with email ${email} does not exist`)
    }
}

module.exports = {
    isRoleValid,
    uniqueEmail,
    existingUserById,
    existingUserByEmail
}