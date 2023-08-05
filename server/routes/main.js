const express = require('express')
const Router = express.Router()
const mainController =  require('../controllers/main')


Router.get('/news', mainController.fetchNews)

module.exports  =  Router