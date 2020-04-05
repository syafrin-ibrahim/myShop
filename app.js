const express = require('express');
const path = require('path');

const app = express();

//engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('views engine',  'ejs');


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=>{
    res.send('Hello World');
});

//set up server
var port = 3000; 
app.listen(port, ()=>{
    console.log('listen on .. port..' + port);
});