<template>
  <div class="eventlist">{{profil}}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "eventlist",
  components: {},
  data() {
    return {
      profil: null
    };
  },
  props: {},
  methods: {
    recupevents() {
      axios
        .get("http://localhost:3000/profil/" + localStorage.getItem("id"))
        .then(res => {
          console.log("Données" + res.data);
          this.profil = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
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
</style>
