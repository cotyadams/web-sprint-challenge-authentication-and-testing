const db = require('../../data/dbConfig')

const findBy = async (filterObj) => {
    return await db('users').where(filterObj).first()
}
const findById = async (user_id) => {
    return await db('users as u').where('u.id', user_id).first()
}

const insert = async (user) => {
    const userId = await db('users').insert(user)
    return findById(userId[0])
}

module.exports = {
    findBy,
    insert,
    findById
}