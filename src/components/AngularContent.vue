<template>
  <div id="angular">
      <!-- Angular -->
      <transition name="fade">
        <div v-if="this.$store.state.value == 'AngularValue'">
          <MyModal @close="angularCloseModal()" v-if="angularModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="angularIframe"></iframe>
            </div>
          </MyModal>
          <!-- 検索機能 -->
          <div class="forms">
            <form>
              <input type="search" v-model="angularKeyword" placeholder="キーワードを入力してください" />
            </form>
          </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in angularReserch" :key="item.url">
              <div @click="angularOpenModal(), clickAngularItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
                <div class="username">
                  <p>投稿者:{{item.userName}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>
<script>

import "firebase/auth";
import "firebase/firestore";
import { firebaseApp } from "../main";
import MyModal from "../components/Mymodal";

export default {
  components: { MyModal },
  data() {
    return {
      videoItems: [],
      angularMapitems: "",
      //検索機能キーワード
      angularKeyword: "",
      //category別Modal
      angularModal: false,
      //category別の動画
      angularItems: [],
      //category別Iframe
      angularIframe: "",
    };
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      firebaseApp
        .firestore()
        .collection("shares")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            self.videoItems.push(doc.data());
          });
          //CategoryがAngularの動画を取得
          self.angularItems = self.videoItems.filter(item => {
            return item.category === "Angular";
          });
          //AngularMap
          self.angularMapitems = self.angularItems.map(elm => {
            return {
              userName: elm.userName,
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });

        });
    });
  },
  methods: {
    //angular動画のvalueを取得
    clickAngularItem(value) {
      this.angularIframe = value.url;
    },
    //angularModal
    angularOpenModal() {
      this.angularModal = true;
    },
    angularCloseModal() {
      this.angularModal = false;
    },
  },
  computed: {
    //angular検索機能
    angularReserch: function() {
      let angularMapitems = [];
      for (let i in this.angularMapitems) {
        const angularMapitem = this.angularMapitems[i];
        if (angularMapitem.title.indexOf(this.angularKeyword) !== -1) {
          angularMapitems.push(angularMapitem);
        }
      }
      return angularMapitems;
    },
  }
};
</script>
<style scoped>
#contents {
  margin: 5em 5em;
}
#content {
  padding: 2em 1em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

h2 {
  padding: 0.5em 1em 4.5em 1em;
}

.username {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  margin-left: 0.5em;
}

.frames {
  width: 90em;
  height: 50em;
}
.parentItems {
  display: flex;
 
  flex-wrap: wrap;
  justify-content: space-between;
}
.childItems {
  width: 32%;
  margin-bottom: 2em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  position: relative;
  cursor: pointer;
}
.fade-enter {
  transform: translate(-350px, 0);
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s 0.3s ease;
}
.fade-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.fade-leave-to {
  transform: translate(200px, 0);
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.3s 0s ease;
}

.forms {
  margin: 0 auto;
  width: 35%;
}
form {
  font-size: 2em;
  margin: 1.5em 0;
}

form input {
  width: 100%;
}
</style>