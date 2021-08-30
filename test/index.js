var express = require('express');
var cors = require('cors');
var path = require('path')
var cookieParser = require('cookie-parser');
var app = express();
var port = process.env.PORT || 3000;

var api = require('./api');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/api', api);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));