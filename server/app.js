if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

let db = process.env.DATABASE || `mongodb://localhost/sales-${process.env.NODE_ENV}`

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

app.use((error, req, res, next) => {
    console.log('error: ', error);
    res.status(500).json(error)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})