<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Reunionou</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/">Home</router-link>

          <router-link class="nav-item nav-link" to="/about">Evenements</router-link>

          <router-link class="nav-item nav-link" to="/about">Profil</router-link>
        </div>
      </div>
      <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
        <li class="nav-item order-2 order-md-1">
          <a href="#" class="nav-link" title="settings">
            <i class="fa fa-cog fa-fw fa-lg"></i>
          </a>
        </li>
        <li class="dropdown order-1">
          <button
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            class="btn btn-outline-secondary dropdown-toggle"
          >
            Login
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right mt-2">
            <li class="px-3 py-2">
              <form class="form" role="form">
                <div class="form-group">
                  <input
                    id="emailInput"
                    v-model="Email"
                    placeholder="Email"
                    class="form-control form-control-sm"
                    type="text"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    id="passwordInput"
                    placeholder="Password"
                    v-model="pass"
                    class="form-control form-control-sm"
                    type="text"
                    required
                  />
                </div>
                <div class="form-group">
                  <button type="submit" v-on:click="login" class="btn btn-primary btn-block">Login</button>
                </div>
                <div class="form-group text-center">
                  <small>
                    <a href="#" data-toggle="modal" data-target="#modalPassword">Forgot password?</a>
                  </small>
                </div>
              </form>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      Email: null,
      pass: null
    };
  },
  props: {},
  methods: {
    login() {
      axios
        .post("http://localhost:3000/connect", {
          email: this.Email,
          password: this.pass
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {}
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
