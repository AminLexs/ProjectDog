const { Router } = require('express')
const Dog = require('../models/schemaDog')
const router = Router()

router.get('/', async (req, res) => {
    const dogs = await Dog.find({})
    res.end(JSON.stringify(dogs))
})
module.exports = router