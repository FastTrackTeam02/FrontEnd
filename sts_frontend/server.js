var express = require('express')
var app = express()

// Alias path
app.use('/styleguide', express.static('dist/styleguide/'))

app.use('/sts/docs', express.static('dist/assets/'))

// Setting port to server
app.listen(3333)
