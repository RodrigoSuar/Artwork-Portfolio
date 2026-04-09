const bcrypt = require('bcrypt')

const adminRouter = require('express').Router()

const Admin = require('../models/admin')
const { request, response } = require('../app')

adminRouter.post('/', async (req,res) => {
    const {username,password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const admin = new Admin({
        username,
        passwordHash
    })

    const savedAdmin = await admin.save()

    res.status(201).json(savedAdmin)
})

module.exports = adminRouter