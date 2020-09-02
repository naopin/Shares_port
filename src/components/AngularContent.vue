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
            <input type="search" v-model="angularKeyword" placeholder="キーワード" />
          </form>
        </div>
        <div class="parentItems">
          <div class="childItems" v-for="item in angularReserch" :key="item.url">
            <div @click="angularOpenModal(), clickAngularItem(item)">
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
          //CategoryがAngularの動画を取得
          self.angularItems = self.videoItems.filter((item) => {
            return item.category === "Angular";
          });
          //AngularMap
          self.angularMapitems = self.angularItems.map((elm) => {
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
    angularReserch: function () {
      let angularMapitems = [];
      for (let i in this.angularMapitems) {
        const angularMapitem = this.angularMapitems[i];
        if (angularMapitem.title.indexOf(this.angularKeyword) !== -1) {
          angularMapitems.push(angularMapitem);
        }
      }
      return angularMapitems;
    },
  },
};
</script>
