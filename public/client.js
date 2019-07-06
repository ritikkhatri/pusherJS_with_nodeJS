Pusher.logToConsole = true;

var pusher = new Pusher('abad9fe71fbf913ba4d0', {
  cluster: 'ap2',
  forceTLS: true
});
var bookForm = document.getElementById("book-form");

const addbook =(e)=>{
    e.preventDefault();
    var newBook = document.getElementById('book-name').value;

    console.log("Ye book"+newBook)
    fetch("http://localhost:3000/post",{method:"POST",
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
      body :JSON.stringify({
          book : newBook
      })
      })
    .then(res=>res.json())
    .then(json=>{
        console.log("YE aaya h wha se"+json.message)
    })
    }
bookForm.addEventListener("submit",addbook);


var channel = pusher.subscribe('post');
channel.bind('add', function(data) {
  data.books.map((bookname)=>{
  $('#books-list').append($('<li>').html('<b>'+bookname+'</b>')); 

  })
});
