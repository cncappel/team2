const usersApp = {
    data() {
      return {
        users: [],
        person: []
      }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date).format('DD MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            fetch('/api/users/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.users = responseJson;
                console.log('pulled users data');
            })
            .catch( (err) => {
                console.error(err);
                console.log('users data not pulling');
            })
        },
        fetchUserData() {
            fetch ('https://randomuser.me/api/')
            .then (response => response.json())
            .then((responseJson) => {
                console.log ('wow you did it');
                this.person = responseJson.results[0];
            })
            .catch((err) => {
                console.error(err);
            })},
    },
    created() {
        this.fetchUserData();
    }
  }
  
  Vue.createApp(usersApp).mount('#userApp');