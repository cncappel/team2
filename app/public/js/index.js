const SomeApp = {
    data() {
      return {
        books: [],
        bookForm: {}
      }
    },
    computed: {},
    methods: {
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
                console.log('hello you');
            })
            .catch( (err) => {
                console.error(err);
                console.log('hello you');
            })
        },
        // postNewBook(evt) {
        //     this.bookForm.bookId;        
        //     console.log("Posting:", this.bookForm);
        //     // alert("Posting!");
    
        //     fetch('api/offer/create.php', {
        //         method:'POST',
        //         body: JSON.stringify(this.bookForm),
        //         headers: {
        //           "Content-Type": "application/json; charset=utf-8"
        //         }
        //       })
        //       .then( response => response.json() )
        //       .then( json => {
        //         console.log("Returned from post:", json);
        //         // TODO: test a result was returned!
        //         this.books = json;
                
        //         // reset the form
        //         this.booksForm = {};
        //       });
        //   }
    },
    created() {
        this.fetchBookData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#booksApp');