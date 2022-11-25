const mongoose = require('mongoose')

const timesSchema = new mongoose.Schema({
    time: Number
})

module.exports = mongoose.model("times", timesSchema)