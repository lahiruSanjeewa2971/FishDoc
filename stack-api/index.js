const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var fishRoutes = require('./routes/fish')
var Gender_n_Plants_Routes = require('./routes/Gender_n_Plants')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))
app.listen(3500,()=>console.log('Server started at : 3500'))

app.use('/Fish_identification',fishRoutes)
app.use('/Gender_n_Plants',Gender_n_Plants_Routes)
app.use(express.static('public'))