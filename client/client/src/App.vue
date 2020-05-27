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
                  <button
                    onclick="document.getElementById('id01').style.display='block'"
                    style="width:auto;"
                  >Sign Up</button>
                </div>
              </form>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view />
    <div id="id01" class="modal">
      <span
        onclick="document.getElementById('id01').style.display='none'"
        class="close"
        title="Close Modal"
      >&times;</span>
      <form class="modal-content" action="/action_page.php">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label for="email">
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter Email" v-model="EmailIns" name="email" required />

          <label for="psw">
            <b>Password</b>
          </label>
          <input type="password" v-model="passIns" placeholder="Enter Password" name="psw" required />

          <label for="psw-repeat">
            <b>Nom</b>
          </label>
          <input type="text" v-model="Nom" placeholder="Nom" name="nom" required />
          <label for="psw-repeat">
            <b>Prénom</b>
          </label>
          <input type="text" v-model="Prenom" placeholder="Prenom" name="prenom" required />
          <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px" /> Remember me
          </label>

          <div class="clearfix">
            <button
              type="button"
              onclick="document.getElementById('id01').style.display='none'"
              class="cancelbtn"
            >Cancel</button>
            <button type="submit" class="signupbtn" v-on:click="iscription">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      Email: null,
      EmailIns: null,
      pass: null,
      passIns: null,
      Nom: null,
      Prenom: null
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
    },
    iscription() {
      axios
        .post("http://localhost:3000/utilisateur", {
          email: this.EmailIns,
          password: this.passIns,
          prenom: this.Prenom,
          nom: this.Nom
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
body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

/* Add a background color when the inputs get focus */
input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for all buttons */
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>
