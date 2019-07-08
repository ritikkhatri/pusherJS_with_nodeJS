var express = require("express");
var app = express();
var API = require('./credentials')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/',(req,res)=>{
})

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: API.APP_ID,
  key: API.KEY,
  secret: API.SECRET,
  cluster: 'ap2',
  encrypted: true
});

var books = [] ;

app.post('/post',(req,res)=>{
    books.push(req.body.book); 
    pusher.trigger('post', 'add', {
        books : books
      });
      res.json({message : "Book added succesfully"})
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
