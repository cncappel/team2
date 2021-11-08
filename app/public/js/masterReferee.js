const masterApp = {
  data() {
    return {
      referees: [],
      selectedRef: null,
      refForm: {},
      dateForm: {},
      report: {}
    }
  },
  computed: {},
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
      postNewRef(evt) {
          fetch('api/referees/create.php', {
              method:'POST',
              body: JSON.stringify(this.refForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form
              this.resetRefForm();
            });
        },
        postRef(evt) {
          console.log ("Test:", this.selectedRef);
        if (this.selectedRef) {
            this.postEditReferee(evt);
        } else {
            this.postNewRef(evt);
        }
      },
        postDeleteReferee(o) {
          if (!confirm("Are you sure you want to delete the offer from "+o.name+"?")) {
              return;
          }
          
          fetch('api/referees/delete.php', {
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
              this.referees = json;
              
              this.resetRefForm();
            });
        },
        postEditReferee(evt) {
          this.refForm.refID = this.selectedRef.refID;       
          
          console.log("Updating!", this.refForm);
  
          fetch('api/referees/update.php', {
              method:'POST',
              body: JSON.stringify(this.refForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              console.log("im stringified")
              
              this.resetRefForm();
            });
        },

        DateRangeRep(evt){
          console.log("Posting:", this.dateForm);
          // alert("Posting!");
    
          fetch('api/report/date.php', {
            method:'POST',
            body: JSON.stringify(this.dateForm),
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
            this.dateForm = {};
          });
      

      
      },
      
      fetchUnassignRefereeData() {
        console.log('A');
        fetch('/api/report/unassign.php')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.report = responseJson;
            console.log('pulled users data',this.report);
        })
        .catch( (err) => {
            console.error(err);
            console.log('users data not pulling');
        })
        console.log('B', this.report);
      },

      resetRefForm() {
        this.selectedRef = null;
        this.refForm = {};
      },
      selectRef(r) {
          this.selectedRef = r;
          this.refForm = Object.assign({}, this.selectedRef);
        }
  },
  created() {
      this.fetchRefereeData();
      this.fetchUnassignRefereeData();
  }
}

Vue.createApp(masterApp).mount('#masterApp');
