// src/routes/api.js

const express = require('express')
const router = express.Router()

var buttonPresses = 0
var buttons = {
    x: 'JAASOOON!'
}

// ":" vor einem Pfadsegment macht es zu einem parameter
router.post('/buttons/:button/press', (req, res) => {
    var button = req.params.button
    if (buttons[button]) {
        buttonPresses++
        res.send(buttons[button] + '\n')
    } else {
        res.status(404)
        res.send('Button not found\n')
    }
    console.log(`${buttonPresses} button presses.`)
})

module.exports = router