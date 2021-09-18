const { Schema, model } = require('mongoose')

const schemaDog = new Schema({
    breedid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

module.exports = model('dogs', schemaDog)