require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const departmentRoutes = require('./routes/department')
const queryRoutes = require('./routes/query')



// express app
const app = express()


app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



// routes
app.use('/api/department', departmentRoutes)
app.use('/api/query', queryRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })

  })
  .catch((error) => {
    console.log(error)
  })