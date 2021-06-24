const express = require('express')
require('dotenv').config()
const app = express();

const searchRoute = require('./routes/search')
const popularRoute = require("./routes/popular");

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use('/search', searchRoute)
app.use('/', popularRoute)

// app.get('/', (req, res) => {
//     res.status(200).render('index')
// })

app.listen(process.env.PORT || 3000, () => {
    console.log("started at 3000");
})