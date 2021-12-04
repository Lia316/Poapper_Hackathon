require('dotenv').config()
const express = require('express')
const complaintRouter = require(process.env.COMPLAINT_ADDRESS)

const app = express()
app.use(express.json())
app.use("/complaint", complaintRouter)

app.get('', (req, res) => {
    res.send("Hello Express!")
})

app.listen(8080, () => {
    console.log("server is running on 8080 port.")
})
