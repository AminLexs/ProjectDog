const { Schema, model } = require('mongoose')

const schemaDog = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

module.exports = model('breeds', schemaDog)