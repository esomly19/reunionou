<template>
  <div class="eventlist">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
      data-backdrop="true"
    >Launch demo modal</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              id="name"
              v-model="name"
              name="name"
              required
              minlength="4"
              maxlength="8"
              size="10"
              placeholder="nom"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" v-on:click="participer">Participer</button>
            <button type="button" class="btn btn-danger">Ne pas participer</button>
          </div>
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
      name: "",
      events: null
    };
  },
  props: {},
  methods: {
    recupevents() {
      axios
        .get("http://localhost:3000/event/" + this.$route.params.token)
        .then(res => {
          console.log("Données" + res.data);
          this.events = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    loadModal() {
      "#myModal".modal("show");
    },
    participer() {
      axios
        .post("http://localhost:3000/participe", {
          nom: this.name,
          token: this.$route.params.token
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.recupevents();
    this.loadModal();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-backdrop,
.modal-backdrop.fade.in {
  opacity: 0.7;
  filter: alpha(opacity=70);
  /*background: #fff;*/
}
</style>
