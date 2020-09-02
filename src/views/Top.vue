<template>
  <div>
    <nav>
      <div id="header">
        <div class="navbar">
          <router-link class="navbar_log" to="/home">Shares</router-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="box">
        <h1>Javascript学習支援サービス</h1>
        <h3>プログラミング動画をシェアしましょう</h3>
        <div class="category">
          <div class="items" v-for="item in items" :key="item.name">
            <div class="item">{{item.name}}</div>
          </div>
        </div>
        <p>その他プログラミング関連の動画もShareできます</p>
        <p>
          現在
          <span>{{nummber}}</span>本の動画がShareされています
        </p>
        <div class="share_btn">
          <router-link to="/home">
            <p>SHARE</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { firebaseApp } from "../main";
import "firebase/auth";
import "firebase/firestore";
export default {
  name: "Home",
  data() {
    return {
      nummber: "",
      navbar: false,
      items: [
        { name: "Javascript" },
        { name: "Vue.js" },
        { name: "React" },
        { name: "Angular" },
        { name: "Node.js" }
      ]
    };
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      firebaseApp
        .firestore()
        .collection("shares")
        .onSnapshot(snapshot => {
          console.log(snapshot.docs.length);
          self.nummber = snapshot.docs.length;
        });
    });
  }
};
</script>

<style scoped>
#header {
  background: #f6f6f6;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  font-family: "Gabriola", "Skia-Regular_Condensed", "Noteworthy", sans-serif;
  padding: 1em;
}

.navbar_log {
  font-size: 4.5em;
  font-weight: 300;
  margin: 0;
  padding: 1rem 0;
  text-shadow: 2px 2px 3px #acabab;
}

.container {
  text-align: center;
  font-size: 2em;
  background-image: url("../assets/background.jpg");
  background: linear-gradient(
        -45deg,
        rgba(22, 135, 237, 0.8),
        rgba(20, 55, 90, 0.8)
      )
      fixed,
    url(../assets/background.jpg) fixed;
  background-size: cover;
  height: 100vh;
  color: #ffffff;
  font-family: "AvenirNext", "Lato", "Hirago KakuGothic ProN", Meiryo,
    sans-serif;
  line-height: 1.5;
  font-weight: bold;
  position: relative;
}

.box {
  padding: 1em;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(249, 251, 254, 0.3);
  width: 100%;
}
.box span {
  color: #ffd000;
  font-size: 1.5em;
}

.category {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 1em 0;
}

.share_btn {
  background: linear-gradient(to right, #da22ff, #9733ee);
  color: #eeeeee;
  border: solid 2px linear-gradient(to right, #da22ff, #9733ee);
  width: 20%;
  margin: 0 auto;
  margin-top: 1em;
  transition: 0.4s;
}
.share_btn:hover {
  background: linear-gradient(to right, #e876ff, #a960e9);
  border: solid 2px linear-gradient(to right, #e876ff, #a960e9);
  transform: translateY(-6px);
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.2);
}

.share_btn:active {
  transform: translateY(6px);
  box-shadow: none;
}

.share_btn p {
  color: #eeeeee;
  padding: 0.5em 0.6em;
}

.category .items {
    cursor: pointer;
}
.category .items:nth-child(1) {
  background: #ffd000;
  border: solid 3px rgb(255, 208, 0);
}

.category .items:nth-child(2) {
  background: rgb(116, 255, 60);
  border: solid 3px rgb(116, 255, 60);
}

.category .items:nth-child(3) {
  background: rgb(60, 226, 255);
  border: solid 3px rgb(60, 226, 255);
}

.category .items:nth-child(4) {
  background: rgb(253, 60, 60);
  border: solid 3px rgb(253, 60, 60);
}

.category .items:nth-child(5) {
  background: rgb(60, 253, 108);
  border: solid 3px rgb(60, 253, 108);
}

.category .items:hover {
  background: transparent;
  transition: .5s;
  color: white;
  transform: translateY(10px);
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.2);
}
.category .items:nth-child(1):hover {
  border: solid 3px rgb(255, 208, 0);
}

.category .items:nth-child(2):hover {
  border: solid 3px rgb(116, 255, 60);
}
.category .items:nth-child(3):hover {
  border: solid 3px rgb(60, 226, 255);
}
.category .items:nth-child(4):hover {
  border: solid 3px rgb(253, 60, 60);
}
.category .items:nth-child(5):hover {
  border: solid 3px rgb(60, 253, 108);
}

.category .item {
  padding: 0.3em 0.5em;
}

.category .items {
  margin: 0.3em 0.4em;
  color: white;
  border-radius: 10px;
  width: 12%;
}
/* responsive */
@media screen and (max-width: 1190px) {
  .container {
    font-size: 1.8em;
  }

  .category {
    display: block;
  }
  .category .items {
    margin: 0 auto;
    margin-bottom: 0.5em;
    width: 22%;
  }
}
@media screen and (max-width: 900px) {
  .container {
    font-size: 1.6em;
  }
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .navbar_log {
    font-size: 3.5em;
  }
}

@media screen and (max-width: 768px) {
  .container {
    font-size: 1.2em;
  }
  .box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .category .items {
    margin-bottom: 0.7em;
  }
  .navbar_log {
    font-size: 3em;
  }
}
@media screen and (max-width: 500px) {
  .container {
    font-size: 1em;
  }
  .box {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .category .items {
    margin-bottom: 0.8em;
  }
}

@media screen and (max-width: 375px) {
  .category .items {
    width: 30%;
  }
  .navbar_log {
    font-size: 2.5em;
  }
}
</style>
