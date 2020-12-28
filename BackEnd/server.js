const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const path = require('path')
const { request } = require('dom-helpers/cjs/animationFrame')
const CoinMarketCap = require('coinmarketcap-api')

const apiKey = 'f0dee9b3-a51d-44a4-90d6-630c961c7169'
const client = new CoinMarketCap(apiKey)

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

const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptos?retryWrites=true&w=majority'
var conn = mongoose.createConnection(myConnectionString)

const myLogoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptologos?retryWrites=true&w=majority'
var conn2 = mongoose.createConnection(myLogoConnectionString)

const Schema = mongoose.Schema

var cryptoSchema = new Schema({
    ticker: String,
    name: String,
    price: String,
    holdings: String,
    logo: String
})

var logoSchema = new Schema ({
    ticker:String,
    name:String,
    logo:String
})

var CryptoModel = conn.model('crypto', cryptoSchema)
var LogoModel = conn2.model('logos', logoSchema)

app.get('/api/cryptos', (req, res) => {
    CryptoModel.find((err, data) =>{
        res.json(data);
    })
})

app.get('/api/cryptos/:id', (req, res) => {
    console.log(req.params.id)

    CryptoModel.findById(req.params.id, (err, data) => {
        res.json(data)
    })
})

app.put('/api/cryptos/:id', (req, res) => {
    console.log("Update crypto: " + req.params.id)
    console.log(req.body)

    CryptoModel.findByIdAndUpdate(req.params.id, req.body, {new: true},
        (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                res.sendStatus(200)
            }
        })
})

app.delete('/api/cryptos/:id', (req, res) => {
    console.log("Delete Crypto: " + req.params.id)

    CryptoModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data)
    })
})

app.post('/api/cryptos', (req, res) => {
    console.log('Crypto Received')
    console.log(req.body.ticker)
    console.log(req.body.holdings)
    
    LogoModel.findOne({'ticker': req.body.ticker}, (err, result) => {
        if(err) {
            console.log(err)
        }
        else if(result == null) {
            console.log('')
            console.log(req.body.ticker + ' not supported!')
        }
        else {
            client.getQuotes({symbol: req.body.ticker, option: 'USD'})
            .then((res) => {
                let ticker = "res.data." + req.body.ticker + ".quote.USD.price"
                let tickerPrice = parseFloat(eval(ticker)).toFixed(3)
                
                CryptoModel.create({
                    ticker: req.body.ticker,
                    name: result.name,
                    price: tickerPrice,
                    holdings: req.body.holdings,
                    logo: result.logo,
                })
            })
            .catch(console.error)
        }
        res.sendStatus(200)
    })
})

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})