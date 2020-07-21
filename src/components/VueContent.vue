<template>
  <div id="vue">
    <!-- vue.js -->
    <transition name="fade">
      <div v-if="this.$store.state.value == 'VueValue'">
        <!-- モーダル -->
        <MyModal @close="vueCloseModal()" v-if="vueModal">
          <div class="frames">
            <iframe width="100%" height="100%" :src="vueIframe"></iframe>
          </div>
        </MyModal>
        <!-- 検索機能 -->
        <div class="forms">
          <form>
            <input type="search" v-model="vueKeyword" placeholder="キーワード" />
          </form>
        </div>
        <div class="parentItems">
          <div class="childItems" v-for="item in vueReserch" :key="item.url">
            <div @click="vueOpenModal(), clickVueItem(item)">
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
      vueMapitems: "",
      //検索機能キーワード
      vueKeyword: "",
      //category別Modal
      vueModal: false,
      //category別の動画
      vueItems: [],
      //category別Iframe
      vueIframe: ""
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
          //CategoryがVue.jsの動画を取得
          self.vueItems = self.videoItems.filter(item => {
            return item.category === "Vue.js";
          });
          //vueMap
          self.vueMapitems = self.vueItems.map(elm => {
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
    //vue動画のvalueを取得
    clickVueItem(value) {
      // console.log(value);
      this.vueIframe = value.url;
    },
    //vueModal
    vueOpenModal() {
      this.vueModal = true;
    },
    vueCloseModal() {
      this.vueModal = false;
    }
  },
  computed: {
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
    }
  }
};
</script>