const News =  require('../model/blogs')

module.exports = {
    
    fetchNews : async (req, res) => {
        try {
            const articles =  await News.find().sort({time :'desc'}).lean()
            res.json(articles)
        } catch (error) {
            console.error(error)
        }
        
    }
}