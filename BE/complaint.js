const express = require('express')
const mysql = require('mysql')
const router = express.Router()

require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect()

router.get('/favicon.ico', (req, res) => { })

router.get('', (req, res) => {
    db.query(`SELECT * FROM complaints`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

router.get('/fromRoom/:id', (req, res) => {
    const id = req.params.id
    db.query(`SELECT * FROM complaints WHERE fromRoom=${id}`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

router.get('/toRoom/:id', (req, res) => {
    const id = req.params.id

    db.query(`SELECT * FROM complaints WHERE toRoom=${id}`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

router.post('/', (req, res) => {
    const body = req.body
    db.query(`INSERT INTO complaints (title, body, created, fromRoom, toRoom) VALUES ('${body.title}', '${body.body}', NOW(), ${body.fromRoom}, ${body.toRoom})`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    db.query(`UPDATE complaints SET title='${body.title}', body='${body.body}', created=NOW(), toRoom='${body.toRoom}' WHERE id=${id}`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.query(`DELETE FROM complaints WHERE id=${id}`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

module.exports = router