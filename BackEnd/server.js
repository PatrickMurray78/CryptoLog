const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const path = require('path')

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
    price: String,
    holdings: String,
    logo: String
})

var logoSchema = new Schema ({
    ticker:String,
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
            res.send(data)
        })
})

app.delete('/api/cryptos/:id', (req, res) => {
    console.log("Delete Crypto: " + req.params.id)

    CryptoModel.findByIdAndDelete(req.params.id, (req, res) => {
        res.send(data)
    })
})

app.post('/api/cryptos', (req, res) => {
    var cryptoLogo;

    console.log('Crypto Received')
    console.log(req.body.ticker)
    console.log(req.body.price)
    console.log(req.body.holdings)

    LogoModel.findOne({'ticker': req.body.ticker}, (err, result) => {
        if(err) {
            console.log(err)
        }
        cryptoLogo = result.logo

        CryptoModel.create({
            ticker:req.body.ticker,
            price:req.body.price,
            holdings:req.body.holdings,
            logo:cryptoLogo
        })

        res.send('Crypto Added');
    })
})

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})