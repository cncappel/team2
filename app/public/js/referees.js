const refereesApp = {
    data() {
      return {
        referees: [],
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
      selectRef(r) {
        if (r == this.selectedRef) {
            return;
        }
        this.selectedRef = r;
        this.referees = [];
        this.fetchAssignData(this.selectedRef);
      },
      fetchRefereeData() {
          fetch('/api/assignments/?')
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
      fetchAssignData(r) {
        console.log("Fetching refree data for ", r);
        fetch('/api/assignments/?referee=', r.id)
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
      if ( !confirm("Are you sure you want to delete the book from " + o.companyName + "?") ) {
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
        this.fetchAssignData();
    }
  }
  
Vue.createApp(refereesApp).mount('#refereesApp');