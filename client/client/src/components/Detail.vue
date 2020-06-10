<template>
  <div class="eventlist">
    <button
      type="button"
      class="btn btn-primary"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >Partager</button>
    {{events}}
    <ul id="example-1">
      <li v-for="item in items" :key="item.nom">{{ item.nom }}</li>
    </ul>
    <ul id="example-1">
      <li v-for="comment in comments" :key="comment.nom">{{ comment.nom }}{{ comment.commentaire }}</li>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
        data-backdrop="true"
      >Commenter</button>
    </ul>

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
            <textarea id="name" v-model="description" name="name" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" v-on:click="commenter">Poster</button>
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
      events: null,
      message: "localhost:8080/evenement/" + this.$route.params.token,
      items: null,
      comments: null,
      name: "",
      description: ""
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
    participants() {
      axios
        .get("http://localhost:3000/participants/" + this.$route.params.token)
        .then(res => {
          console.log("Données" + res.data);
          this.items = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    commentaires() {
      axios
        .get("http://localhost:3000/commentaires/" + this.$route.params.token)
        .then(res => {
          console.log("Données" + res.data);
          this.comments = res.data;
        })
        .catch(err => {
          console.log("CASSE");
          console.log(err);
        });
    },
    commenter() {
      axios
        .post("http://localhost:3000/comment", {
          nom: this.name,
          token: this.$route.params.token,
          commentaire: this.description
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
    this.participants();
    this.commentaires();
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
