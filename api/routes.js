const {Router} = require('express')
const Dog = require('../models/schemaDog')
const Breed = require('../models/schemaBreed')
const router = Router()

router.get('/', async (req, res) => {
    const dogs = await Dog.find({})
    Promise.all(dogs.map(async (dog) => {
        let breed = await Breed.findById(dog.breedid)
        return {
            title: dog.title,
            breed: breed.title,
        }
    })).then(dogs => {
        res.end(JSON.stringify(dogs))//send dogs with breeds
    }).catch(err => {
            res.status(500)
            res.end(JSON.stringify(err))
        }
    )
})
router.all('*', function (req, res) {
    res.status(404).send('Not Found Server Error')
})
module.exports = router