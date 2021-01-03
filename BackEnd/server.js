const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const { body , validationResult, check } = require('express-validator');
const mongoose = require('mongoose')
const path = require('path')
const { request } = require('dom-helpers/cjs/animationFrame')
const CoinMarketCap = require('coinmarketcap-api')

const apiKey = 'f0dee9b3-a51d-44a4-90d6-630c961c7169'
const client = new CoinMarketCap(apiKey)

// Use cors to read JSON data from the Node/Express server
// This code will avoid a CORS error
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-control-Allow-Origin", "*")
    res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

//app.use(express.static(path.join(__dirname, '../build')))
//app.use('/static', express.static(path.join(__dirname, 'build//static')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

// parse application/json
app.use(bodyParser.json())

// Open connection to our cryptos database
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptos?retryWrites=true&w=majority'
var conn = mongoose.createConnection(myConnectionString)

// Open connection to our logos database
const myLogoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptologos?retryWrites=true&w=majority'
var conn2 = mongoose.createConnection(myLogoConnectionString)

// Declare Schema and initialise it
const Schema = mongoose.Schema

// This is the cryptoSchema
var cryptoSchema = new Schema({
    ticker: String,
    name: String,
    price: String,
    holdings: String,
    logo: String
})

// This is the logoSchema
var logoSchema = new Schema ({
    ticker:String,
    name:String,
    logo:String
})

// Create data model to represent the objects we have created
var CryptoModel = conn.model('crypto', cryptoSchema)
var LogoModel = conn2.model('logos', logoSchema)

// Get data from /api/cryptos
app.get('/api/cryptos', (req, res) => {
    CryptoModel.find((err, data) =>{
        data.forEach(crypto => { // For each crypto in database, get their current price in USD
            client.getQuotes({symbol: crypto.ticker, option: 'USD'})
            .then((res) => {
                let ticker = "res.data." + crypto.ticker + ".quote.USD.price"
                let tickerPrice = parseFloat(eval(ticker)).toFixed(3) // Round to 3 decimel places
                // Update the crypto with their updated price
                CryptoModel.findByIdAndUpdate(crypto.id, { price: tickerPrice },
                    (err, data) => {
                        if(err) {
                            console.log(err)
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
            }) 
        });
        res.json(data)
    })
})

// Reads crypto by id from database and returns the crypto if id matched
// crypto from database
app.get('/api/cryptos/:id', (req, res) => {
    CryptoModel.findById(req.params.id, (err, data) => {
        res.json(data)
    })
})

// Updates crypto in database by finding the cryptos ticker which matches id
app.put('/api/cryptos/:id', 
check('holdings').isFloat({ min: 0}), // Check holdings is a valid value
(req, res) => {
    var errors = validationResult(req)
    if(!errors.isEmpty()) { // errors is not empty
        res.sendStatus(404)
    }
    else { // errors is empty
        req.body.holdings = parseFloat(req.body.holdings).toFixed(2) // Round to 2 decimel places
        // Update the crypto with their updated holdings
        CryptoModel.findByIdAndUpdate(req.params.id, req.body, {new: true},
            (err) => {
                if(err) {
                    console.log(err)
                }
            })
            console.log(req.body)
        res.sendStatus(200) // Success
    }   
})

// Finds movie in database using the id and deletes it
app.delete('/api/cryptos/:id', (req, res) => {
    CryptoModel.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            console.log(err)
        }
        res.send(data)
    })
})

// Adds new crypto to database or updates existing one
app.post('/api/cryptos', 
check('holdings').isFloat({ min: 0}), // Check holdings is a valid value
(req, res) => {
    // Try and find the ticker user entered in cryptos database
    CryptoModel.findOne({'ticker': req.body.ticker}, (err, result) => {
        if(err) {
            console.log(err)
        }
        else if(result == null) { // Crypto does not already exist
            // Try and find the ticker user entered in logos database
            LogoModel.findOne({'ticker': req.body.ticker}, (err, result) => {
                if(err) {
                    console.log(err)
                }
                else if(result == null) { // Could not find ticker
                    res.sendStatus(402)
                }
                else { // Found ticker
                    var errors = validationResult(req)
                    if(!errors.isEmpty()) { // errors is not empty
                        res.sendStatus(404)
                    }
                    else { // Errors is empty
                        // Get the cryptos current price in USD
                        client.getQuotes({symbol: req.body.ticker, option: 'USD'})
                        .then((res) => {
                            let ticker = "res.data." + req.body.ticker + ".quote.USD.price"
                            let tickerPrice = parseFloat(eval(ticker)).toFixed(3)
                            let holdings = parseFloat(req.body.holdings).toFixed(2)

                            // Create new crypto
                            CryptoModel.create({
                                ticker: req.body.ticker, // Add the ticker user entered
                                name: result.name, // Add full name from logo database
                                price: tickerPrice, // Add the updated price rounded to 3 decimel places
                                holdings: holdings, // Add the holdings which are rounded to 2 decimel places
                                logo: result.logo, // Add logo from logo database
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        res.sendStatus(200) // Success
                    }
                }
            })
        }
        else { // Crypto already exists so we need to update it
            let updatedHoldings = parseFloat(result.holdings) + parseFloat(req.body.holdings)
            updatedHoldings = parseFloat(updatedHoldings).toFixed(2) // Round the holdings to 2 decimel places
            // Find the crypto in database and set its holdings to the updated holdings
            CryptoModel.findOneAndUpdate({ticker: req.body.ticker}, {$set: {holdings: updatedHoldings}}, (err, result) => {
                if(err) {
                    console.log(err)
                }
                else {
                    res.sendStatus(200) // Success
                }
            })
        }
    })
    
})

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})*/

// Listen to port 4000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})