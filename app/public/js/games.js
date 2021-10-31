const gameApp = {
    data() {
      return {
        games: []
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
    },
    created() {
        this.fetchGameData();
    }
  }

Vue.createApp(gameApp).mount('#gameApp');