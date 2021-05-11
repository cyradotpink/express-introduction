// src/main.js

const express = require('express')
const app = express()

// Mit Routes können wir unsere App
// logisch in Teile trennen
app.use('/api', require('./routes/api'))
app.listen(1312)