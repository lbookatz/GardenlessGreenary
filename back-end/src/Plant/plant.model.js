const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maintenance:{
        type:String
    },
    watering: {
        type: String
    },
    lighting :{
        type: String
    },
    petFriendly :{
        type: String
    },
    indoor :{
        type: Boolean
    },
    notes :{
        type: String
    }
})

const Plant = mongoose.model('plant',plantSchema);


module.exports = { 
    Plant
}
 