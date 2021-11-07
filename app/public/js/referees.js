const refereesApp = {
    data() {
      return {
        referees: [],
        games: [],
        assign: [],
        assignForm: {},
        selectedAssign: null,
        selectedRef: null
      }
    },
    computed: {
        prettyBirthday() {
          return dayjs(this.person.dob.date).format('DD MMM YYYY')
        }
    },
    methods: {
        fetchRefereeData() {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
                console.log('pulled users data');
            })
            .catch( (err) => {
                console.error(err);
                console.log('users data not pulling');
            })
        },
        fetchGameData() {
          fetch('/api/games/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.games = responseJson;
              console.log('pulled users data');
          })
          .catch( (err) => {
              console.error(err);
              console.log('users data not pulling');
          })
      },
        selectGame(g) {
          if (g == this.selectedRef) {
            return;
          }
          this.selectedRef = g;
          this.assign = [];
          this.fetchAssignData(this.selectedRef);
        },
        fetchAssignData(g) {
            console.log("Fetching data for ", g);
            fetch('/api/assignments/?referee=' + g.gameID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assign = responseJson;
                console.log('pulled users data');
            })
            .catch( (err) => {
                console.error(err);
                console.log('users data not pulling');
            })
        },
        postAssign(evt) {
            console.log ("Test:", this.selectedAssign);
          if (this.selectedAssign) {
              this.postEditAssign(evt);
          } else {
              this.postNewAssign(evt);
          }
        },
        postNewAssign (evt) {      
            console.log("Posting:", this.assignForm);
            // alert("Posting!");
      
            fetch('api/assignments/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assign = json;
              
              // reset the form
              this.assignForm = {};
            });
        },
        postEditAssign(evt) {     
            console.log("Posting:", this.assignForm);
            // alert("Posting!"); 


      
            fetch('api/assignments/update.php', {
              method:'POST',
              body: JSON.stringify(this.assignForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assign = json;
              
              // reset the form
              this.assignForm = {};
            });
        },
        postDeleteAssign(o) {  
        if ( !confirm("Are you sure you want to delete the book from " + o.field + "?") ) {
            return;
        }  
            console.log("Delete!", o);
      
            fetch('api/assignments/delete.php', {
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
              this.assign = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditAssign(assign) {
        this.selectedAssign = assign;
        this.assignForm = Object.assign({}, this.selectedAssign);
        },
        handleResetEdit() {
        this.selectedAssign = null;
        this.assignForm = {};
        }

    },
    created() {
        this.fetchRefereeData();
        this.fetchGameData();
    }
  }
  
Vue.createApp(refereesApp).mount('#refereesApp');