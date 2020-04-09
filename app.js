const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const kon = require('./config/database.js');
const app = express(kon.database);
const pages = require('./routes/pages')
const adminPages = require('./routes/adminPages');
const bodyParser =  require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
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


//set route page
app.use('/', pages);

//set route admin page
app.use('/admin', adminPages);

//set up middle ware body-parser
app.use(bodyParser.urlencoded({ extended :  false}));
app.use(bodyParser.json());

//set up middleware session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  ////set up middleware validator
  app.use(expressValidator({
      errorFormatter : function (param, msg, value){
            const namespace = param.split('.')
                    , root = namespace.shift()
                    ,formParam = root;
            while(namespace.length){
                formParam += '[' + namespace.shift() + ']';
            } 

            return {
                param : formParam,
                msg : msg,
                value : value
            };
      }
  }));

////set up express messages
app.use(require('connect-flash')());
app.use((req, res, next)=>{
    res.locals.messages = require('express-messages')(req, res);
    next();
})


//set up server
var port = 3000; 
app.listen(port, ()=>{
    console.log('listen on .. port..' + port);
});