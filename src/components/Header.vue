<template>
  <header>
    <nav>
      <div id="header">
        <div class="navbar">
          <router-link class="navbar_log" to="/home">Shares</router-link>
          <ul>
            <li>
              <div class="modal-window">
                <span @click="SignInopenModal">
                  <font-awesome-icon class="icons" :icon="['fas', 'sign-in-alt']" />
                  <span class="menu">SIGNIN</span>
                </span>

                <MyModal @close="SignIncloseModal" v-if="SignInModal">
                  <SignIn></SignIn>
                </MyModal>
              </div>
            </li>
            <li>
              <div class="modal-window">
                <span @click="SignOutopenModal">
                  <font-awesome-icon class="icons" :icon="['fas', 'user-plus']" />
                  <span class="menu">SIGNUP</span>
                </span>
                <MyModal @close="SignOutcloseModal" v-if="SignOutModal">
                  <SignUp></SignUp>
                </MyModal>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <SelctMenu></SelctMenu> -->
  </header>
</template>
<script>
// import SelctMenu from "../components/SelctMenu";
import MyModal from "../components/Mymodal";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
export default {
  components: { MyModal, SignIn, SignUp },
  name: "Header",
  data() {
    return {
      SignInModal: false,
      SignOutModal: false
    };
  },
  methods: {
    SignInopenModal() {
      this.SignInModal = true;
    },
    SignIncloseModal() {
      this.SignInModal = false;
    },
    SignOutopenModal() {
      this.SignOutModal = true;
    },
    SignOutcloseModal() {
      this.SignOutModal = false;
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
  justify-content: space-between;
  align-items: center;
}
ul {
  display: flex;
  list-style: none;
}
li {
  font-size: 2.5em;
  text-decoration: none;
  padding: 1em 1.3em;
  color: rgb(51, 50, 114);
}

li:hover {
  color: rgb(160, 160, 160);
}

.navbar_log:hover {
  color: rgb(160, 160, 160);
}

li:nth-child(1),
li:nth-child(2) {
  position: relative;
}

.icons:nth-child(1),
.icons:nth-child(2) {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -65%);
}

.menu {
  text-shadow: 2px 2px 3px #acabab;
}

.modal-window {
  background: #f6f6f6;
  cursor: pointer;
}

button:hover {
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

  .navbar_log {
    font-size: 3.5em;
  }
}
@media screen and (max-width: 768px) {
  .navbar_log {
    font-size: 3em;
  }
  .icons {
    width: 70%;
  }
}

@media screen and (max-width: 600px) {
  li {
    padding: 1em 0.9em;
  }
}

@media screen and (max-width: 375px) {
  .navbar_log {
    font-size: 2.5em;
  }
  .icons {
    width: 45%;
  }
  li {
    padding: 1em 0.8em;
  }
}
</style>