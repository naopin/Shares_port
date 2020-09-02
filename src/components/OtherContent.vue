<template>
  <div id="other">
    <!-- other -->
    <transition name="fade">
      <div v-if="this.$store.state.value == 'OtherValue'">
        <MyModal @close="otherCloseModal()" v-if="otherModal">
          <div class="frames">
            <iframe width="100%" height="100%" :src="otherIframe"></iframe>
          </div>
        </MyModal>
        <!-- 検索機能 -->
        <div class="forms">
          <form>
            <input type="search" v-model="otherKeyword" placeholder="キーワード" />
          </form>
        </div>
        <div class="parentItems">
          <div class="childItems" v-for="item in otherReserch" :key="item.url">
            <div @click="otherOpenModal(), clickOtherItem(item)">
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
      otherMapitems: "",
      //検索機能キーワード
      otherKeyword: "",
      //category別Modal
      otherModal: false,
      //category別の動画
      otherItems: [],
      //category別Iframe
      otherIframe: "",
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
          //Categoryがotherの動画を取得
          self.otherItems = self.videoItems.filter((item) => {
            return item.category === "Other";
          });
          //otherMap
          self.otherMapitems = self.otherItems.map((elm) => {
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
    //other動画のvalueを取得
    clickOtherItem(value) {
      this.otherIframe = value.url;
    },
    //otherModal
    otherOpenModal() {
      this.otherModal = true;
    },
    otherCloseModal() {
      this.otherModal = false;
    },
  },
  computed: {
    //other検索機能
    otherReserch: function () {
      let otherMapitems = [];
      for (let i in this.otherMapitems) {
        const otherMapitem = this.otherMapitems[i];
        if (otherMapitem.title.indexOf(this.otherKeyword) !== -1) {
          otherMapitems.push(otherMapitem);
        }
      }
      return otherMapitems;
    },
  },
};
</script>