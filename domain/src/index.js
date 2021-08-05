const express = require('express')
const app = express()
const port = 3000
const db = require("./lib/database")
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./router/domain')(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  db.connectDb().then(() => {
    console.log("MongoDb connected")
    })
})