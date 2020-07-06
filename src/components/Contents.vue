<template>
  <div id="contents">
    <div class="forms">
      <form action="cgi-bin/example.cgi" method="post">
        <input class="inputkeyword" type="search" name="search" placeholder="キーワードを入力" />
        <input class="inputsearch" type="submit" name="submit" value="検索" />
        <div class="radio">
          <input
            type="radio"
            id="allSearch"
            v-model="keyword"
            value="全て"
            name="KeywordSearch"
            checked="checked"
          />
          <label for="allSearch">全て</label>
          <input type="radio" id="movieSearch" v-model="keyword" value="動画" name="KeywordSearch" />
          <label for="movieSearch">動画</label>
          <input type="radio" id="articleSearch" v-model="keyword" value="記事" name="KeywordSearch" />
          <label for="articleSearch">記事</label>
        </div>
      </form>
    </div>

    <div id="content">
      <transition name="fade">
        <div v-if="value == 'JavascriptValue'">
          <MyModal @close="javascriptCloseModal()" v-if="Modal">
            <div class="frames">
              <iframe width="100%" height="100%" :src="jsIframe"></iframe>
            </div>
          </MyModal>
          <div class="javascriptItems">
            <div class="javascriptItem" v-for="item in items" :key="item.url">
              <div @click="javascriptOpenModal(), clickItem(item)" class="jsItem">
                <img v-bind:src="item.thumbnail" />
                <h2>{{item.title}}</h2>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="value == 'VueValue'">
          <p class="title">テスト2</p>
          <p>VueValue</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="value == 'ReacValue'">
          <p>テスト3</p>
          <p>ReacValue</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="value == 'AngularValue'">
          <p class="title">テスト3</p>
          <p>AngularValue</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="value == 'NodeValue'">
          <p class="title">テスト3</p>
          <p>NodeValue</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="value == 'OtherValue'">
          <p class="title">テスト3</p>
          <p>NOtherValue</p>
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
export default {
  components: { MyModal },
  props: ["value"],
  data() {
    return {
      keyword: "",
      videoItems: [],
      items: "",
      videoCategory: [],
      jsIframe: "",
      Modal: false
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
          // 初期値フレーム
          self.jsIframe = self.videoItems[0].snippet.url;
          self.items = self.videoItems.map(elm => {
            return {
              url: elm.snippet.url,
              title: elm.snippet.title,
              description: elm.snippet.description,
              thumbnail: elm.snippet.thumbnails.medium.url
            };
          });
          console.log(self.videoItems);
        });
    });
  },
  methods: {
    // クリックした動画のvalueを取得
    clickItem(value) {
      console.log(value);
      this.jsIframe = value.url;
    },
    javascriptOpenModal() {
      this.Modal = true;
    },
    javascriptCloseModal() {
      this.Modal = false;
    }
  }
};
</script>
<style scoped>
.frames {
  width: 73em;
  height: 41em;
}
.javascriptItems {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.javascriptItem {
  width: 30%;
  margin-bottom: 2em;
   box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
.forms {
  margin: 0 auto;
  width: 35%;
}
form {
  font-size: 1.8em;
  margin-top: 2em;
}
.inputkeyword {
  width: 85%;
}
.inputsearch {
  width: 15%;
}
.radio {
  text-align: left;
}
#contents {
  margin: 1em 1em;
}
#content {
  padding: 5px 10px;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
#content p {
  font-size: 1.5em;
  margin: 0;
}
#content p.title {
  font-size: 1.5em;
  font-weight: bold;
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
</style>