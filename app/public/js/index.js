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
        
        postNewGame(evt) {
            
            console.log("Posting!", this.offerForm);
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.offerForm = {};

                this.fetchBooksData()
              });
            }
    },
    created() {
        this.fetchBookData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#gamesApp');