// src/routes/api.js

const express = require('express')
const router = express.Router()

// Die "mitgelieferte" JSON Middleware parsed einen JSON request body
router.use(express.json())

var order = []

// Das hier ist auch eine Middleware! Sie gilt aber nur für PUT-requests
// auf /order/addItem, während Middlewares mit "use" und keinem Pfad
// für alle Requests auf dem Router gelten.
router.put('/order/addItem', (req, res, next) => {
    if (!req.body.itemDesc || !req.body.amount ||
        !req.body.size) {
        // Wenn next mit einem argument aufgerufen wird, wird dieses als Fehler
        // interpretiert. Es wird die nächste Error-handling-Middleware aufgerufen
        next({
            custom: true,
            message: 'Missing parameters',
            statusCode: 400
        })
    } else {
        order.push(req.body)
        res.responseObj = {
            orderState: order,
            text: `You added ${req.body.amount} ${req.body.itemDesc} (${req.body.size})`
        }

        // Wenn next ohne Argumente aufgerufen wird, wird die nächste reguläre
        // Middleware aufgerufen
        next()
    }
})

router.use((req, res, next) => {
    // Um herauszufinden, ob für die Anfrage eine Route verfügbar
    // ist, kann man req.route überprüfen.
    if (!req.route) {
        next({
            custom: true,
            message: 'No such route',
            statusCode: 404
        })
    } else {
        next()
    }
})

router.use((req, res, next) => {
    var response = {
        success: true,
        result: res.responseObj || {}
    }
    res.send(response)
})

// Diese Middleware ist eine Error-handling middleware, weil die
// übergebene Callback-Funktion mehr als 3 parameter hat.
router.use((err, req, res, next) => {
    console.error(err)
    var response = {
        success: false,
        errorMessage: err.custom ? err.message : 'An unkown error occured'
    }
    res.status(err.custom ? err.statusCode : 500)
    res.send(response)
})

module.exports = router