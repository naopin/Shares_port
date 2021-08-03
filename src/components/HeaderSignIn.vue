<template>
  <header>
    <nav>
      <div id="header">
        <div class="navbar">
          <router-link class="navbar_log" to="/">Shares</router-link>
          <ul>
            <li>
              <router-link to="/home"><font-awesome-icon  class="icons" :icon="['fas', 'home']" /><span class="menu">HOME</span></router-link>
            </li>
            <li>
              <router-link to="/share"><font-awesome-icon class="icons" :icon="['fas', 'share-square']" /><span class="menu">SHARE</span></router-link>
            </li>
            <li>
              <router-link to="/profile"><font-awesome-icon class="icons" :icon="['fas', 'address-card']" /><span class="menu">PROFILE</span></router-link>
            </li>
            <li>
              <router-link to="" ><span @click="logout"><font-awesome-icon class="icons" :icon="['fas', 'sign-out-alt']" /><span class="menu">SIGNOUT</span></span></router-link>
              <!-- <button class="signoutbutton" @click="logout"><font-awesome-icon class="icons" :icon="['fas', 'sign-out-alt']" /><span>SIGNOUT</span></button> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
import firebase from "firebase";
export default {
  name: "Header",
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
       
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
#header {
  background: #f6f6f6;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  font-family: "Gabriola", "Skia-Regular_Condensed", "Noteworthy", sans-serif;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


ul {
  display: flex;
  list-style: none;
  align-items: center;
}
li {
  font-size: 2.5em;
  text-decoration: none;
  padding: 1em 1.2em;
}
.icons:nth-child(1), .icons:nth-child(2), .icons:nth-child(3), .icons:nth-child(4) {
 position: absolute;
 top: 50%;
 left: 0;
 transform: translate(0, -65%);
}
li:nth-child(1), li:nth-child(2),li:nth-child(3), li:nth-child(4) {
   position: relative;
}
a {
  color: blue;
  text-shadow: 2px 2px 3px #acabab;
}

a:hover,
.signoutbutton:hover {
  color: rgb(160, 160, 160);
}

.navbar_log {
  font-size: 4.5em;
  font-weight: 300;
  margin: 0;
  padding: 1rem;
  text-shadow: 2px 2px 3px #acabab;
}


@media screen and (max-width: 1000px) {
 .navbar .menu {
   display: none;
 }
}

@media screen and (max-width: 768px) {
.navbar_log {
  font-size: 3.5em;
}
.icons {
  width: 70%;
}

}

@media screen and (max-width: 600px) {
 li {
   padding: 1em .9em;
 }
 .icons {
  width: 50%;
}
 .icons:nth-child(1), .icons:nth-child(2), .icons:nth-child(3), .icons:nth-child(4) {
 position: absolute;
 top: 50%;
 left: 0;
 transform: translate(0, -50%);
}

}

@media screen and (max-width: 375px) {
  .navbar_log {
  font-size: 3em;
}
.icons {
  width: 45%;
}
li {
   padding: 1em .8em;
 }
}
</style>