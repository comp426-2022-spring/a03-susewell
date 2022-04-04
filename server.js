// Require Express.js
const express = require('express')
const app = express()

const args = require ('minimist')(process.argv.slice(2));
args['port'];
const port_args = args.port;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}



var port = 5000

if (port_args != null) {
    var port = port_args;
}

const server = app.listen(port, () => {
    console.log('App is running on a port %PORT%'.replace('%PORT%', port))
})

function coinFlip() {
    let flip =  Math.random();
    if (flip < 0.5){
        return 'heads'
    } else {
        return 'tails'
    }
}

app.get('/app', (req, res) => {
    res.status(200).end('API is working right')
    res.type('text/plain')
})


app.get('/app/echo/:number', express.json(), (req, res) => {
    res.status(200).json({ 'message': req.params.number })
})

app.get('/app/echo/', (req, res) => {
    res.status(200).json({ 'message' : req.query.number })
})

app.get('/app/echo/', logging, (req, res) => {
    res.status(200).json({ 'message' : req.body.number })
})

app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip' : coinFlip()})
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})