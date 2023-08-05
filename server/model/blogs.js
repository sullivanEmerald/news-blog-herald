const mongoose =  require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    snippet : {
        type : String,
        required : true
    },

    body : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },

    time : {
        type : String,
        required : true
    },

    image: {
        type: String,
        require: true,
    },

    cloudinaryId: {
        type: String,
        require: true,
    },

    day : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required: true,
    }

    
})


module.exports = mongoose.model('New', blogSchema)