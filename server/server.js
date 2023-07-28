const express =  require('express')
const app = express()
const logger =  require('morgan')
const connectDB =  require('./config/database')
const cors =  require('cors')

// connecting my environmental variables with the app
require('dotenv').config({ path : './config/.env'})


// connecting my database with the app
connectDB()

// setting up the app
app.use(logger('dev'))
app.use(cors())

app.get('/api', (req, res) => {
    res.json({ user  : ['sullivan', 'emerald', 'Joshua']})
})


app.listen(process.env.PORT, () => {
    console.log(`Exchange running on port ${process.env.PORT}`)
})
