const mongoose =  require('mongoose')
const commentSchema = new mongoose.Schema({
   id  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "New",
   },

   comment : {
    type : String, 
    required  : true
   },
   
   time : { 
    type : String,
    required : true
   }
})


module.exports = mongoose.model('Comment', commentSchema)