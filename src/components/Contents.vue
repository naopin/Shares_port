<template>
  <div id="contents">
    <div id="content">
      <!-- Javascript -->
      <transition name="fade">
        <div v-if="value == 'JavascriptValue'">
          <!-- モーダル -->
          <MyModal @close="javascriptCloseModal()" v-if="jsModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="jsIframe"></iframe>
            </div>
          </MyModal>
          <div>
            <!-- 検索機能 -->
            <div class="forms">
              <form>
                <input type="search" v-model="jsKeyword" placeholder="キーワードを入力してください" />
              </form>
            </div>
            <div class="parentItems">
              <div class="childItems" v-for="item in jsReserch" :key="item.url">
                <div @click="javascriptOpenModal(), clickJsItem(item)">
                  <img v-bind:src="item.thumbnail" />
                  <h2>{{item.title}}</h2>
                  <div class="username">
                    <p>投稿者:{{item.userName}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- vue.js -->
      <transition name="fade">
        <div v-if="value == 'VueValue'">
          <!-- モーダル -->
          <MyModal @close="vueCloseModal()" v-if="vueModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="vueIframe"></iframe>
            </div>
          </MyModal>
            <!-- 検索機能 -->
            <div class="forms">
              <form>
                <input type="search" v-model="vueKeyword" placeholder="キーワードを入力してください" />
              </form>
            </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in vueReserch" :key="item.url">
              <div @click="vueOpenModal(), clickVueItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- React -->
      <transition name="fade">
        <div v-if="value == 'ReacValue'">
          <MyModal @close="reactCloseModal()" v-if="reactModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="reactIframe"></iframe>
            </div>
          </MyModal>
           <!-- 検索機能 -->
            <div class="forms">
              <form>
                <input type="search" v-model="reactKeyword" placeholder="キーワードを入力してください" />
              </form>
            </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in reactReserch" :key="item.url">
              <div @click="reactOpenModal(), clickReactItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- Angular -->
      <transition name="fade">
        <div v-if="value == 'AngularValue'">
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
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- Node.js -->
      <transition name="fade">
        <div v-if="value == 'NodeValue'">
          <MyModal @close="nodeCloseModal()" v-if="nodeModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="nodeIframe"></iframe>
            </div>
          </MyModal>
            <!-- 検索機能 -->
            <div class="forms">
              <form>
                <input type="search" v-model="nodeKeyword" placeholder="キーワードを入力してください" />
              </form>
            </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in nodeReserch" :key="item.url">
              <div @click="nodeOpenModal(), clickNodeItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- other -->
      <transition name="fade">
        <div v-if="value == 'OtherValue'">
          <MyModal @close="otherCloseModal()" v-if="otherModal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="otherIframe"></iframe>
            </div>
          </MyModal>
             <!-- 検索機能 -->
            <div class="forms">
              <form>
                <input type="search" v-model="otherKeyword" placeholder="キーワードを入力してください" />
              </form>
            </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in otherReserch" :key="item.url">
              <div @click="otherOpenModal(), clickOtherItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseApp } from "../main";
import MyModal from "../components/Mymodal";
// import Search from "../components/Search";

export default {
  components: { MyModal },
  props: ["value"],
  data() {
    return {
      videoItems: [],
      jsMapitems: "",
      vueMapitems: "",
      reactMapitems: "",
      angularMapitems: "",
      nodeMapitems: "",
      otherMapitems: "",
      //検索機能キーワード
      jsKeyword: "",
      vueKeyword:"",
      reactKeyword:"",
      angularKeyword: "",
      nodeKeyword:"",
      otherKeyword:"",
      //category別Modal
      jsModal: false,
      vueModal: false,
      reactModal: false,
      angularModal: false,
      nodeModal: false,
      otherModal: false,
      //category別の動画
      javascriptItems: [],
      vueItems: [],
      reactItems: [],
      angularItems: [],
      nodeItems: [],
      otherItems: [],
      //category別Iframe
      jsIframe: "",
      vueIframe: "",
      reactIframe: "",
      angularIframe: "",
      nodeIframe: "",
      otherIframe: ""
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
          //CategoryがJavascriptの動画を取得
          self.javascriptItems = self.videoItems.filter(item => {
            return item.category === "Javascript";
          });
          //CategoryがVue.jsの動画を取得
          self.vueItems = self.videoItems.filter(item => {
            return item.category === "Vue.js";
          });
          //CategoryがReactの動画を取得
          self.reactItems = self.videoItems.filter(item => {
            return item.category === "React";
          });
          //CategoryがAngularの動画を取得
          self.angularItems = self.videoItems.filter(item => {
            return item.category === "Angular";
          });
          //CategoryがNode.jsの動画を取得
          self.nodeItems = self.videoItems.filter(item => {
            return item.category === "Node.js";
          });
          //Categoryがotherの動画を取得
          self.otherItems = self.videoItems.filter(item => {
            return item.category === "Other";
          });
          // Javascript初期値フレーム
          self.jsIframe = self.javascriptItems[0].snippet.url;

          //jsMap
          self.jsMapitems = self.javascriptItems.map(elm => {
            return {
              userName: elm.userName,
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          //vueMap
          self.vueMapitems = self.vueItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          //ReactMap
          self.reactMapitems = self.reactItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          //AngularMap
          self.angularMapitems = self.angularItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          //nodeMap
          self.nodeMapitems = self.nodeItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          //otherMap
          self.otherMapitems = self.otherItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });

          console.log(self.otherItems);
          // console.log(self.videoItems);
        });
    });
  },
  methods: {
    //Js動画のvalueを取得
    clickJsItem(value) {
      console.log(value);
      this.jsIframe = value.url;
    },
    //javascriptModal
    javascriptOpenModal() {
      this.jsModal = true;
    },
    javascriptCloseModal() {
      this.jsModal = false;
    },

    //vue動画のvalueを取得
    clickVueItem(value) {
      console.log(value);
      this.vueIframe = value.url;
    },
    //vueModal
    vueOpenModal() {
      this.vueModal = true;
    },
    vueCloseModal() {
      this.vueModal = false;
    },
    //react動画のvalueを取得
    clickReactItem(value) {
      console.log(value);
      this.reactIframe = value.url;
    },
    //reactModal
    reactOpenModal() {
      this.reactModal = true;
    },
    reactCloseModal() {
      this.reactModal = false;
    },
    //angular動画のvalueを取得
    clickAngularItem(value) {
      console.log(value);
      this.angularIframe = value.url;
    },
    //angularModal
    angularOpenModal() {
      this.angularModal = true;
    },
    angularCloseModal() {
      this.angularModal = false;
    },
    //node動画のvalueを取得
    clickNodeItem(value) {
      console.log(value);
      this.nodeIframe = value.url;
    },
    //nodeModal
    nodeOpenModal() {
      this.nodeModal = true;
    },
    nodeCloseModal() {
      this.nodeModal = false;
    },
    //other動画のvalueを取得
    clickOtherItem(value) {
      console.log(value);
      this.otherIframe = value.url;
    },
    //otherModal
    otherOpenModal() {
      this.otherModal = true;
    },
    otherCloseModal() {
      this.otherModal = false;
    }
  },
  computed: {
    //javascript検索機能
    jsReserch: function() {
      let jsMapitems = [];
      for (let i in this.jsMapitems) {
        const jsMapitem = this.jsMapitems[i];
        if (jsMapitem.title.indexOf(this.jsKeyword) !== -1) {
          jsMapitems.push(jsMapitem);
        }
      }
      return jsMapitems;
    },
     //vue検索機能
     vueReserch: function() {
      let vueMapitems = [];
      for (let i in this.vueMapitems) {
        const vueMapitem = this.vueMapitems[i];
        if (vueMapitem.title.indexOf(this.vueKeyword) !== -1) {
          vueMapitems.push(vueMapitem);
        }
      }
      return vueMapitems;
    },
    //react検索機能
     reactReserch: function() {
      let reactMapitems = [];
      for (let i in this.reactMapitems) {
        const reactMapitem = this.reactMapitems[i];
        if (reactMapitem.title.indexOf(this.reactKeyword) !== -1) {
          reactMapitems.push(reactMapitem);
        }
      }
      return reactMapitems;
    },
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
    //node検索機能
     nodeReserch: function() {
      let nodeMapitems = [];
      for (let i in this.nodeMapitems) {
        const nodeMapitem = this.nodeMapitems[i];
        if (nodeMapitem.title.indexOf(this.nodeKeyword) !== -1) {
          nodeMapitems.push(nodeMapitem);
        }
      }
      return nodeMapitems;
    },
    //other検索機能
     otherReserch: function() {
      let otherMapitems = [];
      for (let i in this.otherMapitems) {
        const otherMapitem = this.otherMapitems[i];
        if (otherMapitem.title.indexOf(this.otherKeyword) !== -1) {
          otherMapitems.push(otherMapitem);
        }
      }
      return otherMapitems;
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
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.childItems {
  width: 32%;
  margin-bottom: 2em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  position: relative;
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