const Blogs = require('../model/blogs');
const cloudinary = require('../middlewares/cloudinary');

module.exports  = {

     createNews : async (req, res) => {

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date();
        const dayName = daysOfWeek[date.getDay()]; // This will give you the name of the day
        const day = date.getDate();
        const month = date.getMonth() + 1; // add 1 because getMonth() returns 0-11 for Jan-Dec
        const year = date.getFullYear();  
        const time = date.toLocaleTimeString();

        console.log(req.body)
        console.log(req.file)
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
            category : req.body.category
          });
      
          return res.json({ msg: 'Data saved successfully', imageUrl: result.secure_url });

        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      },
      
}

