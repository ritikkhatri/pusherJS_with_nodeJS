//To make Channels a bit more chatty about what is coming in via
// the socket connection
Pusher.logToConsole = true;
var pusher = new Pusher('abad9fe71fbf913ba4d0', {
  cluster: 'ap2',
  forceTLS: true
});
var bookForm = document.getElementById("book-form");

const addbook =(e)=>{
    e.preventDefault();

    //store name of new book in a variable
    var newBook = document.getElementById('book-name').value;

//call route '/post' to trigger event with new book
    fetch("http://localhost:3000/post",{method:"POST",
    headers: {
        'Content-Type': 'application/json',
    },
      body :JSON.stringify({
          book : newBook
      })
      })
    .then(res=>res.json())
    .then(json=>{
        console.log(json.message)
    })
    }

    //add a event Listener on form submit
bookForm.addEventListener("submit",addbook);

//subscribe the channel to bind events of channel
var channel = pusher.subscribe('post');

//bind the event of the presence channel to get the data attched with it
channel.bind('add', function(data) {
  var length = data.books.length;
//render the data of a event in division using jQuery
  $('#books-list').append($('<li>').html('<b>'+data.books[length-1]+'</b>')); 

});
