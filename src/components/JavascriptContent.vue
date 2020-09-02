<template>
  <div id="javascript">
    <!-- Javascript -->
    <transition name="fade">
      <div v-if="this.$store.state.value == 'JavascriptValue'">
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
              <input type="search" v-model="jsKeyword" placeholder="キーワード" />
            </form>
          </div>
          <div class="parentItems">
            <div class="childItems" v-for="item in jsReserch" :key="item.url">
              <div @click="javascriptOpenModal(), clickJsItem(item)">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
                <div class="comments">
                  <h3>コメント</h3>
                  <p>{{item.comment}}</p>
                </div>

                <div class="username">
                  <p>投稿者:{{item.userName}}</p>
                </div>
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
  props: ["value"],
  data() {
    return {
      videoItems: [],
      jsMapitems: "",
      //検索機能キーワード
      jsKeyword: "",
      //category別Modal
      jsModal: false,
      //category別の動画
      javascriptItems: [],
      //category別Iframe
      jsIframe: "",
    };
  },
  created() {
    this.$nextTick(function () {
      const self = this;
      firebaseApp
        .firestore()
        .collection("shares")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            self.videoItems.push(doc.data());
          });
          //CategoryがJavascriptの動画を取得
          self.javascriptItems = self.videoItems.filter((item) => {
            return item.category === "Javascript";
          });

          //jsMap
          self.jsMapitems = self.javascriptItems.map((elm) => {
            return {
              userName: elm.userName,
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url,
              comment: elm.comment,
            };
          });
        });
    });
  },
  methods: {
    //Js動画のvalueを取得
    clickJsItem(value) {
      this.jsIframe = value.url;
    },
    //javascriptModal
    javascriptOpenModal() {
      this.jsModal = true;
    },
    javascriptCloseModal() {
      this.jsModal = false;
    },
  },
  computed: {
    //javascript検索機能
    jsReserch: function () {
      let jsMapitems = [];
      for (let i in this.jsMapitems) {
        const jsMapitem = this.jsMapitems[i];
        if (jsMapitem.title.indexOf(this.jsKeyword) !== -1) {
          jsMapitems.push(jsMapitem);
        }
      }
      return jsMapitems;
    },
  },
};
</script>
