const path = require('path')
require('dotenv').config({ path: path.resolve('/Users/gimjigyeong/Desktop/Developer/Poapper_Hackathon/.env')})
const express = require('express')
const complaintRouter = require(process.env.COMPLAINT_ADDRESS)

const app = express()
app.use(express.json())
app.use("/complaint", complaintRouter)

app.get('', (req, res) => {
    res.send("Hello Express!")
})

var port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`server is running on ${port} port.`)
})