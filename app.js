const path = require('path')
require('dotenv').config()
const express = require('express')
const complaintRouter = require(path.resolve('/app/BE/complaint.js'))

const app = express()
app.use(express.json())
app.use("/complaint", complaintRouter)

app.get('', (req, res) => {
    res.send("Hello Express!")
})

var port = process.env.PORT || 3306
app.listen(port, () => {
    console.log(`server is running on ${port} port.`)
})