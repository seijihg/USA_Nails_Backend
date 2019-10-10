require('./node_modules/dotenv/lib/main').config()
const express = require("./node_modules/express")
const app = express()
const path = require('path')

const bodyParser = require('./node_modules/body-parser')
app.use(bodyParser.json())


//-- CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
//--

//-- Routes for API version 1
const apiv1 = "/api_v1"

const usersRoutes = require('./routes/api_v1/users')
app.use(apiv1, usersRoutes)

//--

const sequelize = require('./bin/database')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize
      .sync()
      .then(res => {
        app.listen(process.env.PORT || 8080)
      })
      .catch(console.log)
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });