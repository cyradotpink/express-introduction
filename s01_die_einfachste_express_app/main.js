// src/main.js

const express = require('express')
const app = express()

app.get('/snake', (req, res) => {
    res.send('Why are we still here? Just to suffer? Every night, I can feel my leg...\n')
})

app.listen(1312)