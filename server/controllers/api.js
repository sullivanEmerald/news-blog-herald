const Blogs = require('../model/blogs');
const cloudinary = require('../middlewares/cloudinary');
const Comment = require('../model/comments')

module.exports  = {

     createNews : async (req, res) => {

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date();
        const dayName = daysOfWeek[date.getDay()]; // This will give you the name of the day
        const day = date.getDate();
        const month = date.getMonth() + 1; // add 1 because getMonth() returns 0-11 for Jan-Dec
        const year = date.getFullYear();  
        const time = date.toLocaleTimeString();

        try {
          if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
          }
      
          const result = await cloudinary.uploader.upload(req.file.path);
      
          await Blogs.create({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body,
            date: `${day}/${month}/${year}`,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            time: time,
            day: dayName,
            category : req.body.category,
            like : 0
          });
      
          return res.json({ msg: 'Data saved successfully', imageUrl: result.secure_url });

        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      },


      updateLikes : async (req, res) => {
        try {
          const updateBlog =  await Blogs.findByIdAndUpdate(req.params.id, {
            $inc : {
              like : 1
            }
          })

          if(updateBlog){
            const newUpdatedBlog = await Blogs.findById(req.params.id)
            res.json({likes : newUpdatedBlog.like})
          }else{
            res.json({ likes : 'Did not updated'})
          }
        } catch (error) {
          console.error(error)
        }
      },


      removePost : async (req, res) => {
        try {
          await Blogs.findByIdAndDelete(req.params.id)
          console.log('deleted')
          res.json({ msg : 'deleted'})
        } catch (error) {
          console.error(error)
        }
      },

      getPost :  async (req, res) => {
        console.log(req.params.id)
        try {
          const post = await Blogs.findById(req.params.id)
          res.json(post)
        } catch (error) {
          res.status(500).json({ msg : error})
        }
      },


      updatePost : async (req, res) => {
        try { 
         const updateRecord =  await Blogs.findByIdAndUpdate(req.params.id, {
            $set : {
              title : req.body.title,
              snippet : req.body.snippet,
              body : req.body.body
            }
          }) 
          
          if(updateRecord) {
             return res.json({ msg : 'Update have been made successfully'})
          }else{
            return res.json({ msg : 'Update have been made failed'})
          }
        } catch (error) {
          console.error(error)
        }
      }
      
}

