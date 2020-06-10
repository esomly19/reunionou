<template>
  <div class="eventlist">
    <div class="container">
      <div class="card-deck">
        <div v-for="item in events" :key="item.id" class="card">
          <div class="card-header">{{ item.titre }}</div>
          <div class="card-body">{{ item.description }}</div>
          <div class="card-footer">{{ item.date }}</div>
          <button v-on:click="detail(item.token)">Detail</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "eventlist",
  components: {},
  data() {
    return {
      events: null
    };
  },
  props: {},
  methods: {
    recupevents() {
      axios
        .get("http://localhost:3000/events")
        .then(res => {
          console.log(res.data);
          this.events = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    detail(token) {
      this.$router.push({ name: "detail", params: { token: token } });
    }
  },
  mounted() {
    this.recupevents();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding-top: 20px;
}

.card-deck {
  margin: 0 -15px;
  justify-content: space-between;
}

.card-deck .card {
  margin: 0 0 1rem;
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .card-deck .card {
    -ms-flex: 0 0 48.7%;
    flex: 0 0 48.7%;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .card-deck .card {
    -ms-flex: 0 0 32%;
    flex: 0 0 32%;
  }
}

@media (min-width: 992px) {
  .card-deck .card {
    -ms-flex: 0 0 24%;
    flex: 0 0 24%;
  }
}
</style>
