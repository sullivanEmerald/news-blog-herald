const { LogError } = require('concurrently');
const Comment =  require('../model/comments')

module.exports = { 

    postComment :  async (req, res) => {
        console.log(req.body)
        const date = new Date();
        const time = date.toLocaleTimeString();
        try {
            const postComment = await Comment.create({
                id : req.params.id,
                comment  : req.body.comment,
                time : time
            })
            
            if(postComment) {
                const newPost = await Comment.find().lean()
                const lastComment =  newPost[newPost.length - 1]
                res.json(lastComment)
            }else{
                res.json({ msg : 'Comment Not Posted'})  
            }

        } catch (error) {
            res.status(400).json({ error : error})
        }
        
    },


    getComments : async (req, res) => {
        console.log(req.params.id)
        try {
            const blogComments =  await Comment.find({ id : req.params.id})
            res.json(blogComments)
        } catch (error) {
            res.json(400).json({msg : error})
        }
    } ,


    deleteComment : async (req, res) => {
        try {
            const { id } = req.params
            const deleteComment = await Comment.findByIdAndDelete(id)
            if(deleteComment){
                res.json({ msg : 'Comment Delete'})
                console.log('deleted')
            }else{
                res.json({ msg : 'Server not responding'})
            }
        } catch (error) {
            console.error(error)
        }
    }
}