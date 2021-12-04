const express = require('express')
const complaintRouter = require('~/Poapper_Hackathon/BE/complaint.js')

const app = express()
app.use(express.json())
app.use("/complaint", complaintRouter)

app.get('', (req, res) => {
    res.send("Hello Express!")
})

app.listen(8080, () => {
    console.log("server is running on 8080 port.")
})
