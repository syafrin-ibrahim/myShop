const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const kon = require('./config/database.js')

const app = express(kon.database);

//engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine',  'ejs');


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//konkesi
mongoose.connect('mongodb://localhost/my-shop');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('koneksi success');
});

app.get('/',(req, res)=>{
    res.render('index', {
        title : 'Home'
    });
});

//set up server
var port = 3000; 
app.listen(port, ()=>{
    console.log('listen on .. port..' + port);
});