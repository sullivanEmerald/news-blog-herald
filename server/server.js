const express =  require('express')
const app = express()
const logger =  require('morgan')
const connectDB =  require('./config/database')
const cors =  require('cors')
const blog =  require('./routes/api')
const main  =  require('./routes/main')


// connecting my environmental variables with the app
require('dotenv').config({ path : './config/.env'})


// connecting my database with the app
connectDB()

// setting up the app
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

app.use('/', main)
app.use('/api', blog)
    
app.listen(process.env.PORT, () => {
    console.log(`Herald running on port ${process.env.PORT}`)
})
