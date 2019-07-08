var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/',(req,res)=>{
})

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '817449',
  key: 'abad9fe71fbf913ba4d0',
  secret: 'cd78d8fd37c3d64a6e47',
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
