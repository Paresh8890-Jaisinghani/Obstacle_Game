const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    ObstacleScore1 : {type : String,required : true},
    ObstacleScore2 : {type : String,required : true},
    ObstacleScore3 : {type : String,required : true},
    otpcode : {type : String}
});


const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;