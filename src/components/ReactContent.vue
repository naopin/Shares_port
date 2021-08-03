<template>
  <div id="react">
    <!-- React -->
    <transition name="fade">
      <div v-if="this.$store.state.value == 'ReacValue'">
        <MyModal @close="reactCloseModal()" v-if="reactModal">
          <div class="frames">
            <iframe width="100%" height="100%" :src="reactIframe"></iframe>
          </div>
        </MyModal>
        <!-- 検索機能 -->
        <div class="forms">
          <form>
            <input type="search" v-model="reactKeyword" placeholder="キーワード" />
          </form>
        </div>
        <div class="parentItems">
          <div class="childItems" v-for="item in reactReserch" :key="item.url">
            <div @click="reactOpenModal(), clickReactItem(item)">
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
      reactMapitems: "",
      //検索機能キーワード
      reactKeyword: "",
      //category別Modal
      reactModal: false,
      //category別の動画
      reactItems: [],
      //category別Iframe
      reactIframe: ""
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
          //CategoryがReactの動画を取得
          self.reactItems = self.videoItems.filter(item => {
            return item.category === "React";
          });
          //ReactMap
          self.reactMapitems = self.reactItems.map(elm => {
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
    //react動画のvalueを取得
    clickReactItem(value) {
      // console.log(value);
      this.reactIframe = value.url;
    },
    //reactModal
    reactOpenModal() {
      this.reactModal = true;
    },
    reactCloseModal() {
      this.reactModal = false;
    }
  },
  computed: {
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
    }
  }
};
</script>
