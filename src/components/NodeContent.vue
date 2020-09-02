<template>
  <div id="node">
    <!-- Node.js -->
    <transition name="fade">
      <div v-if="this.$store.state.value == 'NodeValue'">
        <MyModal @close="nodeCloseModal()" v-if="nodeModal">
          <div class="frames">
            <iframe width="100%" height="100%" :src="nodeIframe"></iframe>
          </div>
        </MyModal>
        <!-- 検索機能 -->
        <div class="forms">
          <form>
            <input type="search" v-model="nodeKeyword" placeholder="キーワード" />
          </form>
        </div>
        <div class="parentItems">
          <div class="childItems" v-for="item in nodeReserch" :key="item.url">
            <div @click="nodeOpenModal(), clickNodeItem(item)">
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
      nodeMapitems: "",
      //検索機能キーワード
      nodeKeyword: "",
      //category別Modal
      nodeModal: false,
      //category別の動画
      nodeItems: [],
      //category別Iframe
      nodeIframe: "",
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
          //CategoryがNode.jsの動画を取得
          self.nodeItems = self.videoItems.filter((item) => {
            return item.category === "Node.js";
          });
          //nodeMap
          self.nodeMapitems = self.nodeItems.map((elm) => {
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
    //node動画のvalueを取得
    clickNodeItem(value) {
      this.nodeIframe = value.url;
    },
    //nodeModal
    nodeOpenModal() {
      this.nodeModal = true;
    },
    nodeCloseModal() {
      this.nodeModal = false;
    },
  },
  computed: {
    //node検索機能
    nodeReserch: function () {
      let nodeMapitems = [];
      for (let i in this.nodeMapitems) {
        const nodeMapitem = this.nodeMapitems[i];
        if (nodeMapitem.title.indexOf(this.nodeKeyword) !== -1) {
          nodeMapitems.push(nodeMapitem);
        }
      }
      return nodeMapitems;
    },
  },
};
</script>
