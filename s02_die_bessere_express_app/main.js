// src/main.js

const express = require('express')
const app = express()

app.use('/api', require('./routes/api'))
app.listen(1312)