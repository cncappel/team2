const refereesApp = {
    data() {
      return {
        referees: [],
        assign: []
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
        fetchAssignData() {
            fetch("/api/assignments/")
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.assign = responseJson;
                console.log('pulled users data');
            })
            .catch( (err) => {
                console.error(err)
                console.log('users data not pulling');
            })
        }
    },
    created() {
        this.fetchRefereeData();
    }
  }
  
Vue.createApp(refereesApp).mount('#refereesApp');