const Offer = {
    data() {
      return {
        "person": {}
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date).format('DD MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
        fetch ('https://randomuser.me/api/')
        .then (response => response.json())
        .then((responseJson) => {
            console.log ('wow you did it');
            this.person = responseJson.results[0];
        })
        .catch((err) => {
            console.error(err);
        })}
 },
    created() {
        this.fetchUserData();
    },
} // end Offer config
  
Vue.createApp(Offer).mount('#offerApp');