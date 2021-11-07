const gameApp = {
    data() {
      return {
        games: [],
        selectedGame: null,
        gameForm: {}
      }
    },
    computed: {},
    methods: {
        fetchGameData() {
            fetch('/api/games/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
                console.log('pulled game data');
            })
            .catch( (err) => {
                console.error(err);
                console.log('game data not pulling');
            })
        },
        postNewGame(evt) {
          fetch('api/games/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.resetGameForm();
            });
        },
        postGame(evt) {
          console.log ("Test:", this.selectedGame);
        if (this.selectedGame) {
            this.postEditGame(evt);
        } else {
            this.postNewGame(evt);
        }
      },
        postDeleteGame(o) {
          if (!confirm("Are you sure you want to delete the offer from "+o.field+"?")) {
              return;
          }
          
          fetch('api/games/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              this.resetGameForm();
            });
        },
        postEditGame(evt) {
          this.gameForm.gameID = this.selectedGame.gameID;       
          
          console.log("Updating!", this.gameForm);
  
          fetch('api/games/update.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              console.log("im stringified")
              
              this.resetGameForm();
            });
        },
      resetGameForm() {
        this.selectedGame = null;
        this.gameForm = {};
      },
      selectGame(r) {
          this.selectedGame = r;
          this.gameForm = Object.assign({}, this.selectedGame);
        },
    },
    created() {
        this.fetchGameData();
    }
  }

Vue.createApp(gameApp).mount('#gameApp');